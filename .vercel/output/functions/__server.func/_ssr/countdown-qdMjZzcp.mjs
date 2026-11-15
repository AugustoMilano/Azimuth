import { i as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as padUnit, l as countdownParts, m as isTimed } from "./use-briefing-BYmvayHo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/countdown-qdMjZzcp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var UNITS = [
	{
		key: "days",
		label: "Days"
	},
	{
		key: "hours",
		label: "Hrs"
	},
	{
		key: "minutes",
		label: "Min"
	},
	{
		key: "seconds",
		label: "Sec"
	}
];
function Countdown({ net, precision }) {
	const [now, setNow] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!isTimed(precision)) return;
		const tick = () => setNow(Date.now());
		tick();
		const id = window.setInterval(tick, 1e3);
		return () => window.clearInterval(id);
	}, [precision]);
	if (!isTimed(precision)) return null;
	const parts = now == null ? null : countdownParts(net, now);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-4 gap-2",
		"aria-hidden": true,
		children: UNITS.map((unit) => {
			const value = parts ? parts[unit.key] : null;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-bg px-1 py-3 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-2xl font-semibold tabular-nums tracking-tight",
					children: value == null ? "––" : unit.key === "days" ? String(value) : padUnit(value)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 text-xs tracking-widest text-muted uppercase",
					children: parts?.past ? "Ago" : unit.label
				})]
			}, unit.key);
		})
	});
}
function LocalNet({ net }) {
	const [label, setLabel] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setLabel(new Intl.DateTimeFormat(void 0, {
			weekday: "short",
			month: "short",
			day: "numeric",
			hour: "numeric",
			minute: "2-digit",
			timeZoneName: "short"
		}).format(new Date(net)));
	}, [net]);
	if (!label) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: label
	});
}
//#endregion
export { LocalNet as n, Countdown as t };
