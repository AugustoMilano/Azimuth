import { i as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as ChevronLeft, s as ExternalLink } from "../_libs/lucide-react.mjs";
import { r as Route$1 } from "./router-WY-ACwaw.mjs";
import { _ as useSaved, a as SaveLaunchButton, c as StatusChip, f as formatWindow, g as useBriefing, m as isTimed, r as Poster, u as formatNet } from "./use-briefing-BYmvayHo.mjs";
import { n as LocalNet, t as Countdown } from "./countdown-qdMjZzcp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/launch._id-mMuUbvPV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LaunchDetail() {
	const { id } = Route$1.useParams();
	const query = useBriefing();
	const saved = useSaved((state) => state.launches[id]);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setMounted(true), []);
	const launch = query.data?.launches.find((launch) => launch.id === id) ?? (mounted ? saved : void 0);
	if (!launch) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 pt-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Back, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 text-sm text-muted",
			children: mounted && query.data ? "That flight isn’t in the current range." : "Opening flight card…"
		})]
	});
	const windowLabel = formatWindow(launch.windowStart, launch.windowEnd);
	const facts = [
		["Provider", launch.provider],
		["Vehicle", launch.vehicle],
		["Pad", launch.pad],
		["Location", launch.location],
		["Type", launch.missionType],
		["NET", formatNet(launch.net, launch.precision)],
		windowLabel ? ["Window", windowLabel] : null
	].filter((row) => row !== null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "pb-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between px-2 pt-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Back, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveLaunchButton, { launch })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-hidden rounded-card border border-line bg-surface",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 bg-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative h-56",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Poster, {
								src: launch.image,
								label: launch.vehicle
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute top-3 left-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, {
									abbrev: launch.statusAbbrev,
									status: launch.status
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-medium tracking-widest text-muted uppercase",
										children: launch.vehicle
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "mt-1 text-3xl font-semibold tracking-tight",
										children: launch.mission
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted",
										children: launch.location
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Countdown, {
									net: launch.net,
									precision: launch.precision
								}),
								isTimed(launch.precision) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocalNet, { net: launch.net }) : null,
								launch.statusDetail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-pretty text-muted",
									children: launch.statusDetail
								}) : null
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "mt-4 overflow-hidden rounded-card bg-surface",
					children: facts.map(([label, value], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: index > 0 ? "flex items-baseline justify-between gap-4 border-t border-line px-4 py-3" : "flex items-baseline justify-between gap-4 px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "shrink-0 text-sm text-muted",
							children: label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "text-right text-sm font-medium",
							children: value
						})]
					}, label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: launch.url,
					target: "_blank",
					rel: "noreferrer",
					className: "tap mt-4 flex h-12 items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-on-primary",
					children: ["Launch record", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-4" })]
				})
			]
		})]
	});
}
function Back() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/",
		"aria-label": "Back to launches",
		className: "tap flex size-11 items-center justify-center rounded-full text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-6" })
	});
}
//#endregion
export { LaunchDetail as component };
