import { isCoarse, isTimed } from "./format";
import type { Article, Launch, LaunchFilter } from "./types";

const GRACE_MS = 15 * 60 * 1000;

export function isPastLaunch(launch: Launch, now: number) {
  const t = new Date(launch.net).getTime();
  const terminal = launch.statusAbbrev === "Success" || launch.statusAbbrev === "Failure";
  return terminal || t < now - GRACE_MS;
}

export function splitLaunches(launches: Launch[], now = Date.now()) {
  const future: Launch[] = [];
  const past: Launch[] = [];
  for (const launch of launches) {
    if (isPastLaunch(launch, now)) past.push(launch);
    else future.push(launch);
  }
  future.sort((a, b) => +new Date(a.net) - +new Date(b.net));
  past.sort((a, b) => +new Date(b.net) - +new Date(a.net));
  const timed = future.filter((launch) => isTimed(launch.precision));
  const next = timed[0] ?? future[0] ?? null;
  const rest = next ? future.filter((launch) => launch.id !== next.id) : future;
  return {
    next,
    onDeck: rest.filter((launch) => !isCoarse(launch.precision)),
    months: rest.filter((launch) => isCoarse(launch.precision)),
    past,
  };
}

export function matchesLaunch(launch: Launch, filter: LaunchFilter, query: string) {
  if (filter === "go" && launch.statusAbbrev !== "Go" && launch.statusAbbrev !== "In Flight") return false;
  if (filter === "crewed" && !/human|crew|tourism/i.test(`${launch.missionType} ${launch.mission}`)) return false;
  if (filter === "science" && !/science/i.test(launch.missionType)) return false;
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [launch.mission, launch.vehicle, launch.provider, launch.location, launch.pad, launch.missionType, launch.status]
    .join(" ")
    .toLowerCase()
    .includes(q);
}

export function matchesArticle(article: Article, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [article.title, article.summary, article.site, article.authors].join(" ").toLowerCase().includes(q);
}
