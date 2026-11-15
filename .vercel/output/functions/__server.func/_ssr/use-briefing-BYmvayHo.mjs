import { i as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { b as getRouteApi } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as RefreshCw, l as Bookmark, r as Search, t as X } from "../_libs/lucide-react.mjs";
import { a as cn, i as getBriefing } from "./router-WY-ACwaw.mjs";
import { t as formatDistanceToNowStrict } from "../_libs/date-fns.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-briefing-BYmvayHo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var useSaved = create()(persist((set) => ({
	launches: {},
	stories: {},
	toggleLaunch: (launch) => set((state) => {
		const next = { ...state.launches };
		if (next[launch.id]) delete next[launch.id];
		else next[launch.id] = launch;
		return { launches: next };
	}),
	toggleStory: (article) => set((state) => {
		const key = String(article.id);
		const next = { ...state.stories };
		if (next[key]) delete next[key];
		else next[key] = article;
		return { stories: next };
	})
}), { name: "azimuth-saved" }));
function useMounted() {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setMounted(true), []);
	return mounted;
}
function PageHeader({ title, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "flex items-end justify-between gap-3 px-5 pt-6 pb-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-semibold tracking-widest text-primary uppercase",
			children: "Azimuth"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 text-3xl font-semibold tracking-tight",
			children: title
		})] }), action]
	});
}
function RefreshButton({ pending, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		"aria-label": "Refresh briefing",
		className: "tap flex size-11 items-center justify-center rounded-full bg-surface-2 text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("size-5", pending && "animate-spin") })
	});
}
function SearchField({ value, onChange, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "mx-5 flex h-12 items-center gap-2 rounded-full bg-surface-2 px-4 focus-within:ring-2 focus-within:ring-primary/50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
				className: "size-4 shrink-0 text-muted",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value,
				onChange: (event) => onChange(event.target.value),
				placeholder,
				type: "search",
				className: "min-w-0 flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-muted"
			}),
			value ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": "Clear search",
				onClick: () => onChange(""),
				className: "tap -mr-2 flex size-11 items-center justify-center text-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
			}) : null
		]
	});
}
function StatusChip({ abbrev, status }) {
	const hot = abbrev === "Go" || abbrev === "In Flight";
	const done = abbrev === "Success";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold", hot && "bg-primary text-on-primary", done && "bg-accent text-bg", !hot && !done && "bg-surface-3 text-fg"),
		children: [hot ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "live-dot size-1.5 rounded-full bg-on-primary" }) : null, status]
	});
}
function SaveLaunchButton({ launch }) {
	const mounted = useMounted();
	const saved = useSaved((state) => Boolean(state.launches[launch.id]));
	const toggle = useSaved((state) => state.toggleLaunch);
	const show = mounted && saved;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-pressed": show,
		"aria-label": show ? `Remove ${launch.mission} from saved` : `Save ${launch.mission}`,
		onClick: () => toggle(launch),
		className: "tap flex size-11 shrink-0 items-center justify-center rounded-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: cn("size-5", show ? "fill-primary text-primary" : "text-muted") })
	});
}
function SaveStoryButton({ article }) {
	const mounted = useMounted();
	const saved = useSaved((state) => Boolean(state.stories[String(article.id)]));
	const toggle = useSaved((state) => state.toggleStory);
	const show = mounted && saved;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-pressed": show,
		"aria-label": show ? `Remove ${article.title} from saved` : `Save ${article.title}`,
		onClick: () => toggle(article),
		className: "tap flex size-11 shrink-0 items-center justify-center rounded-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: cn("size-5", show ? "fill-primary text-primary" : "text-muted") })
	});
}
function FeedNote({ fetchedAt, source }) {
	const [label, setLabel] = (0, import_react.useState)("live");
	(0, import_react.useEffect)(() => {
		if (source === "fallback") return;
		const update = () => setLabel(formatDistanceToNowStrict(new Date(fetchedAt), { addSuffix: true }));
		update();
		const id = window.setInterval(update, 3e4);
		return () => window.clearInterval(id);
	}, [fetchedAt, source]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "px-5 text-xs text-muted",
		children: [source === "fallback" ? "Range feed is quiet — showing the packed briefing." : `Updated ${label}`, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: " · times in UTC" })]
	});
}
function Poster({ src, label, className }) {
	const [failed, setFailed] = (0, import_react.useState)(false);
	const letters = label.split(/\s+/).filter((word) => /[A-Za-z0-9]/.test(word[0] ?? "")).slice(0, 2).map((word) => word[0]).join("").toUpperCase();
	if (!src || failed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex h-full w-full items-center justify-center bg-surface-3 text-accent", className),
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-2xl font-semibold tracking-widest",
			children: letters || "AZ"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt: "",
		onError: () => setFailed(true),
		referrerPolicy: "no-referrer",
		className: cn("h-full w-full object-cover", className)
	});
}
var MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec"
];
var MONTHS_LONG = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];
var DAYS = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat"
];
function isCoarse(precision) {
	return precision === "M" || precision === "MON" || precision === "Q" || precision === "Y";
}
function isTimed(precision) {
	return precision === "SEC" || precision === "MIN" || precision === "HR";
}
function pad(n) {
	return String(n).padStart(2, "0");
}
function utcMonth(iso) {
	return MONTHS[new Date(iso).getUTCMonth()] ?? "";
}
function utcDay(iso) {
	return String(new Date(iso).getUTCDate());
}
function formatStamp(iso) {
	const d = new Date(iso);
	return `${DAYS[d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} · ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())} UTC`;
}
function formatNet(iso, precision) {
	const d = new Date(iso);
	if (isCoarse(precision)) return `${MONTHS_LONG[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
	if (!isTimed(precision)) return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
	return formatStamp(iso);
}
function formatWindow(start, end) {
	if (!start) return null;
	if (!end || start === end) return formatStamp(start);
	const a = new Date(start);
	const b = new Date(end);
	if (a.getUTCFullYear() === b.getUTCFullYear() && a.getUTCMonth() === b.getUTCMonth() && a.getUTCDate() === b.getUTCDate()) return `${formatStamp(start)} – ${pad(b.getUTCHours())}:${pad(b.getUTCMinutes())}`;
	return `${formatStamp(start)} – ${formatStamp(end)}`;
}
function countdownParts(net, now) {
	const diff = new Date(net).getTime() - now;
	const past = diff <= 0;
	const abs = Math.abs(diff);
	return {
		past,
		days: Math.floor(abs / 864e5),
		hours: Math.floor(abs % 864e5 / 36e5),
		minutes: Math.floor(abs % 36e5 / 6e4),
		seconds: Math.floor(abs % 6e4 / 1e3)
	};
}
function padUnit(n) {
	return String(n).padStart(2, "0");
}
var rootRoute = getRouteApi("__root__");
function useBriefing() {
	const initial = rootRoute.useLoaderData();
	return useQuery({
		queryKey: ["briefing"],
		queryFn: () => getBriefing(),
		initialData: initial,
		initialDataUpdatedAt: Date.parse(initial.fetchedAt),
		staleTime: initial.source === "fallback" ? 2e4 : 3e5
	});
}
//#endregion
export { useSaved as _, SaveLaunchButton as a, StatusChip as c, formatStamp as d, formatWindow as f, useBriefing as g, padUnit as h, RefreshButton as i, countdownParts as l, isTimed as m, PageHeader as n, SaveStoryButton as o, isCoarse as p, Poster as r, SearchField as s, FeedNote as t, formatNet as u, utcDay as v, utcMonth as y };
