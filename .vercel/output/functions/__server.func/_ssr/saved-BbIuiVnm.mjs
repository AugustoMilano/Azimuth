import { i as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as Bookmark } from "../_libs/lucide-react.mjs";
import { _ as useSaved, a as SaveLaunchButton, d as formatStamp, g as useBriefing, n as PageHeader, o as SaveStoryButton, r as Poster, u as formatNet, v as utcDay, y as utcMonth } from "./use-briefing-BYmvayHo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/saved-BbIuiVnm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useMounted() {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setMounted(true), []);
	return mounted;
}
function SavedPage() {
	const mounted = useMounted();
	const briefing = useBriefing();
	const launches = useSaved((state) => state.launches);
	const stories = useSaved((state) => state.stories);
	const live = briefing.data?.launches ?? [];
	const savedLaunches = Object.values(launches).map((launch) => live.find((item) => item.id === launch.id) ?? launch).sort((a, b) => +new Date(a.net) - +new Date(b.net));
	const savedStories = Object.values(stories).sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
	const empty = savedLaunches.length === 0 && savedStories.length === 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5 pb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: "Saved" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-5 text-sm text-muted",
				children: "Pins stay on this device."
			}),
			!mounted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-5 text-sm text-muted",
				children: "Opening pins…"
			}) : null,
			mounted && empty ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-5 rounded-card bg-surface px-5 py-10 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "mx-auto size-6 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: "Nothing pinned yet. Save a launch or a story and it will wait here."
				})]
			}) : null,
			mounted && savedLaunches.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-2 px-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "px-1 text-xs font-medium tracking-widest text-muted uppercase",
					children: "Launches"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "overflow-hidden rounded-card bg-surface",
					children: savedLaunches.map((launch, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: index > 0 ? "border-t border-line" : void 0,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SavedLaunchRow, { launch })
					}, launch.id))
				})]
			}) : null,
			mounted && savedStories.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-2 px-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "px-1 text-xs font-medium tracking-widest text-muted uppercase",
					children: "News"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "overflow-hidden rounded-card bg-surface",
					children: savedStories.map((article, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: index > 0 ? "border-t border-line" : void 0,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SavedStoryRow, { article })
					}, article.id))
				})]
			}) : null
		]
	});
}
function SavedLaunchRow({ launch }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/launch/$id",
			params: { id: launch.id },
			className: "flex min-w-0 flex-1 items-center gap-3 py-3 pr-1 pl-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-12 shrink-0 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs font-medium tracking-wider text-muted uppercase",
					children: utcMonth(launch.net)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xl font-semibold tabular-nums leading-tight",
					children: utcDay(launch.net)
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-sm font-medium",
					children: launch.mission
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-xs text-muted",
					children: formatNet(launch.net, launch.precision)
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pr-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveLaunchButton, { launch })
		})]
	});
}
function SavedStoryRow({ article }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/story/$id",
			params: { id: String(article.id) },
			className: "flex min-w-0 flex-1 items-center gap-3 py-3 pl-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "size-14 shrink-0 overflow-hidden rounded-2xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Poster, {
					src: article.image,
					label: article.site
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "line-clamp-2 font-serif text-base leading-snug font-medium",
					children: article.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted tabular-nums",
					children: formatStamp(article.publishedAt)
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pr-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveStoryButton, { article })
		})]
	});
}
//#endregion
export { SavedPage as component };
