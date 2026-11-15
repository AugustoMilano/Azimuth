import { i as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as ChevronLeft, s as ExternalLink } from "../_libs/lucide-react.mjs";
import { n as Route } from "./router-WY-ACwaw.mjs";
import { _ as useSaved, d as formatStamp, g as useBriefing, o as SaveStoryButton, r as Poster } from "./use-briefing-BYmvayHo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/story._id-BK73pLpj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StoryDetail() {
	const { id } = Route.useParams();
	const query = useBriefing();
	const saved = useSaved((state) => state.stories[id]);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setMounted(true), []);
	const article = query.data?.articles.find((article) => String(article.id) === id) ?? (mounted ? saved : void 0);
	if (!article) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 pt-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Back, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 text-sm text-muted",
			children: mounted && query.data ? "That story isn’t in this briefing." : "Opening story…"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "pb-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between px-2 pt-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Back, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveStoryButton, { article })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-card bg-surface",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-56",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Poster, {
							src: article.image,
							label: article.site
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-xs font-medium tracking-widest text-accent uppercase",
					children: article.site
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-serif text-3xl leading-tight font-medium",
					children: article.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-muted",
					children: [article.authors ? `${article.authors} · ` : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums",
						children: formatStamp(article.publishedAt)
					})]
				}),
				article.summary ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-base leading-relaxed text-pretty text-fg",
					children: article.summary
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: article.url,
					target: "_blank",
					rel: "noreferrer",
					className: "tap mt-6 flex h-12 items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-on-primary",
					children: [
						"Read at ",
						article.site,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-4" })
					]
				})
			]
		})]
	});
}
function Back() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/news",
		"aria-label": "Back to news",
		className: "tap flex size-11 items-center justify-center rounded-full text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-6" })
	});
}
//#endregion
export { StoryDetail as component };
