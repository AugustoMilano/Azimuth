import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/briefing-D32NfVw6.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var LAUNCHES_URL = "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=30&mode=list";
var NEWS_URL = "https://api.spaceflightnewsapi.net/v4/articles/?limit=16";
var TTL_MS = 6e5;
var memory = null;
var pending = null;
function asRecord(value) {
	return value !== null && typeof value === "object" ? value : null;
}
function str(value) {
	return typeof value === "string" && value.trim() ? value : null;
}
function mapLaunch(value) {
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
		url: str(row.url) ?? `https://ll.thespacedevs.com/2.2.0/launch/${id}/`
	};
}
function mapArticle(value) {
	const row = asRecord(value);
	if (!row || typeof row.id !== "number" || !str(row.title) || !str(row.url)) return null;
	const authors = Array.isArray(row.authors) ? row.authors.map((author) => str(asRecord(author)?.name)).filter((name) => Boolean(name)).join(", ") : "";
	return {
		id: row.id,
		title: str(row.title) ?? "Untitled",
		summary: str(row.summary) ?? "",
		url: str(row.url) ?? "",
		image: str(row.image_url),
		site: str(row.news_site) ?? "News",
		authors,
		publishedAt: str(row.published_at) ?? (/* @__PURE__ */ new Date(0)).toISOString()
	};
}
async function fetchJson(url) {
	const response = await fetch(url, {
		headers: {
			Accept: "application/json",
			"User-Agent": "Azimuth/1.0 (launch briefing)"
		},
		signal: AbortSignal.timeout(12e3)
	});
	if (!response.ok) throw new Error(`Feed responded ${response.status}`);
	return response.json();
}
async function loadLive() {
	const [launchJson, newsJson] = await Promise.all([fetchJson(LAUNCHES_URL), fetchJson(NEWS_URL)]);
	const launchRows = asRecord(launchJson)?.results;
	const newsRows = asRecord(newsJson)?.results;
	if (!Array.isArray(launchRows) || !Array.isArray(newsRows)) throw new Error("Feed shape changed");
	const launches = launchRows.map(mapLaunch).filter((row) => row !== null);
	const articles = newsRows.map(mapArticle).filter((row) => row !== null);
	if (launches.length === 0 || articles.length === 0) throw new Error("Feed was empty");
	return {
		launches,
		articles,
		fetchedAt: (/* @__PURE__ */ new Date()).toISOString(),
		source: "live"
	};
}
async function loadFallback() {
	const mod = await import("./fallback-OV9wcuYH.mjs");
	return {
		launches: mod.FALLBACK_LAUNCHES,
		articles: mod.FALLBACK_ARTICLES,
		fetchedAt: mod.FALLBACK_AT,
		source: "fallback"
	};
}
async function load() {
	try {
		const data = await loadLive();
		memory = {
			at: Date.now(),
			data
		};
		return data;
	} catch {
		const data = await loadFallback();
		memory = {
			at: Date.now() - 555e3,
			data
		};
		return data;
	}
}
var getBriefing_createServerFn_handler = createServerRpc({
	id: "98894aca6f66f9a75af5c89816d2f7a6ed4c01319c8cd0c26330502e9d5ccbda",
	name: "getBriefing",
	filename: "src/lib/space/briefing.ts"
}, (opts) => getBriefing.__executeServer(opts));
var getBriefing = createServerFn({ method: "GET" }).handler(getBriefing_createServerFn_handler, async () => {
	if (memory && Date.now() - memory.at < TTL_MS) return memory.data;
	if (!pending) pending = load().finally(() => {
		pending = null;
	});
	return pending;
});
//#endregion
export { getBriefing_createServerFn_handler };
