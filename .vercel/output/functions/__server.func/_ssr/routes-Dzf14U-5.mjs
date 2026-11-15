import { i as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as cn } from "./router-WY-ACwaw.mjs";
import { a as SaveLaunchButton, c as StatusChip, g as useBriefing, i as RefreshButton, m as isTimed, n as PageHeader, p as isCoarse, r as Poster, s as SearchField, t as FeedNote, u as formatNet, v as utcDay, y as utcMonth } from "./use-briefing-BYmvayHo.mjs";
import { n as LocalNet, t as Countdown } from "./countdown-qdMjZzcp.mjs";
import { n as matchesLaunch, r as splitLaunches } from "./select-BAzbKhUV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Dzf14U-5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	{
		id: "all",
		label: "All"
	},
	{
		id: "go",
		label: "Go"
	},
	{
		id: "crewed",
		label: "Crewed"
	},
	{
		id: "science",
		label: "Science"
	}
];
function LaunchBoard() {
	const query = useBriefing();
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [search, setSearch] = (0, import_react.useState)("");
	const data = query.data;
	if (!data) return null;
	const matched = data.launches.filter((launch) => matchesLaunch(launch, filter, search));
	const groups = splitLaunches(matched);
	const filtering = filter !== "all" || search.trim().length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5 pb-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Launches",
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
				placeholder: "Vehicle, pad, provider"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2 overflow-x-auto px-5 pb-1",
				role: "group",
				"aria-label": "Filter launches",
				children: FILTERS.map((item) => {
					const active = filter === item.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-pressed": active,
						onClick: () => setFilter(item.id),
						className: cn("tap h-11 shrink-0 rounded-full px-4 text-sm font-medium", active ? "bg-primary text-on-primary" : "bg-surface-2 text-fg"),
						children: item.label
					}, item.id);
				})
			}),
			groups.next ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NextLaunch, { launch: groups.next })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-5 text-sm text-muted",
				children: "Nothing on the range matches that."
			}),
			groups.onDeck.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LaunchSection, {
				title: "On deck",
				launches: groups.onDeck
			}) : null,
			groups.months.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LaunchSection, {
				title: "Month windows",
				launches: groups.months,
				coarse: true
			}) : null,
			!filtering && groups.past.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LaunchSection, {
				title: "Just flew",
				launches: groups.past
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-5 text-xs text-muted",
				children: "Launches from The Space Devs. News from the Spaceflight News API."
			})
		]
	});
}
function NextLaunch({ launch }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "overflow-hidden rounded-card border border-line bg-surface",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 bg-primary" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-52",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Poster, {
						src: launch.image,
						label: launch.vehicle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "scrim pointer-events-none absolute inset-0" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-3 left-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, {
							abbrev: launch.statusAbbrev,
							status: launch.status
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium tracking-widest text-muted uppercase",
									children: launch.vehicle
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-1 text-2xl font-semibold tracking-tight",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/launch/$id",
										params: { id: launch.id },
										className: "hover:text-primary",
										children: launch.mission
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-muted",
									children: [
										launch.provider,
										" · ",
										launch.pad
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveLaunchButton, { launch })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Countdown, {
						net: launch.net,
						precision: launch.precision
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium tabular-nums",
							children: formatNet(launch.net, launch.precision)
						}),
						isTimed(launch.precision) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocalNet, { net: launch.net }) : null,
						!isTimed(launch.precision) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: isCoarse(launch.precision) ? "Month only — no T-0 yet." : "Day set, hour not published."
						}) : null
					] })
				]
			})
		]
	});
}
function LaunchSection({ title, launches, coarse = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-2 px-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "px-1 text-xs font-medium tracking-widest text-muted uppercase",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "overflow-hidden rounded-card bg-surface",
			children: launches.map((launch, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: index > 0 ? "border-t border-line" : void 0,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
								children: coarse || isCoarse(launch.precision) ? "NET" : utcDay(launch.net)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-medium",
								children: launch.mission
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-xs text-muted",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: launch.statusAbbrev === "Go" ? "text-primary" : void 0,
										children: launch.statusAbbrev
									}),
									" · ",
									launch.vehicle
								]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pr-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveLaunchButton, { launch })
					})]
				})
			}, launch.id))
		})]
	});
}
var SplitComponent = LaunchBoard;
//#endregion
export { SplitComponent as component };
