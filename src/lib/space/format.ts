const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = [
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
  "December",
];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function isCoarse(precision: string) {
  return precision === "M" || precision === "MON" || precision === "Q" || precision === "Y";
}

export function isTimed(precision: string) {
  return precision === "SEC" || precision === "MIN" || precision === "HR";
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function utcMonth(iso: string) {
  return MONTHS[new Date(iso).getUTCMonth()] ?? "";
}

export function utcDay(iso: string) {
  return String(new Date(iso).getUTCDate());
}

export function formatStamp(iso: string) {
  const d = new Date(iso);
  return `${DAYS[d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} · ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())} UTC`;
}

export function formatNet(iso: string, precision: string) {
  const d = new Date(iso);
  if (isCoarse(precision)) return `${MONTHS_LONG[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  if (!isTimed(precision)) return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  return formatStamp(iso);
}

export function formatWindow(start: string | null, end: string | null) {
  if (!start) return null;
  if (!end || start === end) return formatStamp(start);
  const a = new Date(start);
  const b = new Date(end);
  const sameDay = a.getUTCFullYear() === b.getUTCFullYear() && a.getUTCMonth() === b.getUTCMonth() && a.getUTCDate() === b.getUTCDate();
  if (sameDay) return `${formatStamp(start)} – ${pad(b.getUTCHours())}:${pad(b.getUTCMinutes())}`;
  return `${formatStamp(start)} – ${formatStamp(end)}`;
}

export function countdownParts(net: string, now: number) {
  const diff = new Date(net).getTime() - now;
  const past = diff <= 0;
  const abs = Math.abs(diff);
  const days = Math.floor(abs / 86_400_000);
  const hours = Math.floor((abs % 86_400_000) / 3_600_000);
  const minutes = Math.floor((abs % 3_600_000) / 60_000);
  const seconds = Math.floor((abs % 60_000) / 1000);
  return { past, days, hours, minutes, seconds };
}

export function padUnit(n: number) {
  return String(n).padStart(2, "0");
}
