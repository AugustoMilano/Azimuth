import { m as isTimed, p as isCoarse } from "./use-briefing-BYmvayHo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/select-BAzbKhUV.js
var GRACE_MS = 9e5;
function isPastLaunch(launch, now) {
	const t = new Date(launch.net).getTime();
	return launch.statusAbbrev === "Success" || launch.statusAbbrev === "Failure" || t < now - GRACE_MS;
}
function splitLaunches(launches, now = Date.now()) {
	const future = [];
	const past = [];
	for (const launch of launches) if (isPastLaunch(launch, now)) past.push(launch);
	else future.push(launch);
	future.sort((a, b) => +new Date(a.net) - +new Date(b.net));
	past.sort((a, b) => +new Date(b.net) - +new Date(a.net));
	const next = future.filter((launch) => isTimed(launch.precision))[0] ?? future[0] ?? null;
	const rest = next ? future.filter((launch) => launch.id !== next.id) : future;
	return {
		next,
		onDeck: rest.filter((launch) => !isCoarse(launch.precision)),
		months: rest.filter((launch) => isCoarse(launch.precision)),
		past
	};
}
function matchesLaunch(launch, filter, query) {
	if (filter === "go" && launch.statusAbbrev !== "Go" && launch.statusAbbrev !== "In Flight") return false;
	if (filter === "crewed" && !/human|crew|tourism/i.test(`${launch.missionType} ${launch.mission}`)) return false;
	if (filter === "science" && !/science/i.test(launch.missionType)) return false;
	const q = query.trim().toLowerCase();
	if (!q) return true;
	return [
		launch.mission,
		launch.vehicle,
		launch.provider,
		launch.location,
		launch.pad,
		launch.missionType,
		launch.status
	].join(" ").toLowerCase().includes(q);
}
function matchesArticle(article, query) {
	const q = query.trim().toLowerCase();
	if (!q) return true;
	return [
		article.title,
		article.summary,
		article.site,
		article.authors
	].join(" ").toLowerCase().includes(q);
}
//#endregion
export { matchesLaunch as n, splitLaunches as r, matchesArticle as t };
