import { i as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as formatStamp, g as useBriefing, i as RefreshButton, n as PageHeader, o as SaveStoryButton, r as Poster, s as SearchField, t as FeedNote } from "./use-briefing-BYmvayHo.mjs";
import { t as matchesArticle } from "./select-BAzbKhUV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/news-Da9Lzq1U.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewsBoard() {
	const query = useBriefing();
	const [search, setSearch] = (0, import_react.useState)("");
	const data = query.data;
	if (!data) return null;
	const [lead, ...rest] = data.articles.filter((article) => matchesArticle(article, search));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5 pb-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "News",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshButton, {
					pending: query.isFetching,
					onClick: () => void query.refetch()
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedNote, {
				fetchedAt: data.fetchedAt,
				source: data.source
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchField, {
				value: search,
				onChange: setSearch,
				placeholder: "Search dispatches"
			}),
			lead ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadStory, { article: lead })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-5 text-sm text-muted",
				children: "No dispatches match that."
			}),
			rest.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mx-5 overflow-hidden rounded-card bg-surface",
				children: rest.map((article, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: index > 0 ? "border-t border-line" : void 0,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoryRow, { article })
				}, article.id))
			}) : null
		]
	});
}
function LeadStory({ article }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "overflow-hidden rounded-card border border-line bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/story/$id",
			params: { id: String(article.id) },
			className: "block",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative h-48",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Poster, {
					src: article.image,
					label: article.site
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-widest text-accent uppercase",
						children: article.site
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-2xl leading-tight font-medium",
						children: article.title
					}),
					article.summary ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "line-clamp-3 text-sm text-muted",
						children: article.summary
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted tabular-nums",
						children: formatStamp(article.publishedAt)
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-end px-2 pb-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveStoryButton, { article })
		})]
	});
}
function StoryRow({ article }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/story/$id",
			params: { id: String(article.id) },
			className: "flex min-w-0 flex-1 items-center gap-3 py-3 pl-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "size-16 shrink-0 overflow-hidden rounded-2xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Poster, {
					src: article.image,
					label: article.site
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-wide text-accent uppercase",
						children: article.site
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "line-clamp-2 font-serif text-base leading-snug font-medium",
						children: article.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted tabular-nums",
						children: formatStamp(article.publishedAt)
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pr-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveStoryButton, { article })
		})]
	});
}
var SplitComponent = NewsBoard;
//#endregion
export { SplitComponent as component };
