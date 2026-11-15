import { createServerFn } from "@tanstack/react-start";
import type { Article, Briefing, Launch } from "./types";

const LAUNCHES_URL = "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=30&mode=list";
const NEWS_URL = "https://api.spaceflightnewsapi.net/v4/articles/?limit=16";
const TTL_MS = 10 * 60 * 1000;
const FALLBACK_TTL_MS = 45 * 1000;

let memory: { at: number; data: Briefing } | null = null;
let pending: Promise<Briefing> | null = null;

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" ? (value as Record<string, unknown>) : null;
}

function str(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value : null;
}

function mapLaunch(value: unknown): Launch | null {
  const row = asRecord(value);
  if (!row) return null;
  const id = str(row.id);
  const name = str(row.name);
  const net = str(row.net);
  if (!id || !name || !net) return null;
  const status = asRecord(row.status);
  const precision = asRecord(row.net_precision);
  const [vehicle, ...missionParts] = name.split(" | ");
  const mission = str(row.mission) ?? (missionParts.join(" | ") || name);
  return {
    id,
    slug: str(row.slug) ?? id,
    name,
    vehicle: vehicle || "Vehicle",
    mission,
    provider: str(row.lsp_name) ?? "Unknown provider",
    status: str(status?.name) ?? "Unknown",
    statusAbbrev: str(status?.abbrev) ?? "TBD",
    statusDetail: str(status?.description) ?? "",
    net,
    precision: str(precision?.abbrev) ?? "DAY",
    windowStart: str(row.window_start),
    windowEnd: str(row.window_end),
    pad: str(row.pad) ?? "Pad TBD",
    location: str(row.location) ?? "Location TBD",
    missionType: str(row.mission_type) ?? "Unspecified",
    image: str(row.image),
    url: str(row.url) ?? `https://ll.thespacedevs.com/2.2.0/launch/${id}/`,
  };
}

function mapArticle(value: unknown): Article | null {
  const row = asRecord(value);
  if (!row || typeof row.id !== "number" || !str(row.title) || !str(row.url)) return null;
  const authors = Array.isArray(row.authors)
    ? row.authors
        .map((author) => str(asRecord(author)?.name))
        .filter((name): name is string => Boolean(name))
        .join(", ")
    : "";
  return {
    id: row.id,
    title: str(row.title) ?? "Untitled",
    summary: str(row.summary) ?? "",
    url: str(row.url) ?? "",
    image: str(row.image_url),
    site: str(row.news_site) ?? "News",
    authors,
    publishedAt: str(row.published_at) ?? new Date(0).toISOString(),
  };
}

async function fetchJson(url: string): Promise<unknown> {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "Azimuth/1.0 (launch briefing)",
    },
    signal: AbortSignal.timeout(12_000),
  });
  if (!response.ok) throw new Error(`Feed responded ${response.status}`);
  return response.json();
}

async function loadLive(): Promise<Briefing> {
  const [launchJson, newsJson] = await Promise.all([fetchJson(LAUNCHES_URL), fetchJson(NEWS_URL)]);
  const launchRows = asRecord(launchJson)?.results;
  const newsRows = asRecord(newsJson)?.results;
  if (!Array.isArray(launchRows) || !Array.isArray(newsRows)) throw new Error("Feed shape changed");
  const launches = launchRows.map(mapLaunch).filter((row): row is Launch => row !== null);
  const articles = newsRows.map(mapArticle).filter((row): row is Article => row !== null);
  if (launches.length === 0 || articles.length === 0) throw new Error("Feed was empty");
  return { launches, articles, fetchedAt: new Date().toISOString(), source: "live" };
}

async function loadFallback(): Promise<Briefing> {
  const mod = await import("./fallback");
  return {
    launches: mod.FALLBACK_LAUNCHES,
    articles: mod.FALLBACK_ARTICLES,
    fetchedAt: mod.FALLBACK_AT,
    source: "fallback",
  };
}

async function load(): Promise<Briefing> {
  try {
    const data = await loadLive();
    memory = { at: Date.now(), data };
    return data;
  } catch {
    const data = await loadFallback();
    memory = { at: Date.now() - (TTL_MS - FALLBACK_TTL_MS), data };
    return data;
  }
}

export const getBriefing = createServerFn({ method: "GET" }).handler(async () => {
  if (memory && Date.now() - memory.at < TTL_MS) return memory.data;
  if (!pending) pending = load().finally(() => { pending = null; });
  return pending;
});
