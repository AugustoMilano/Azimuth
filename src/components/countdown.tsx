import { useEffect, useState } from "react";
import { countdownParts, isTimed, padUnit } from "@/lib/space/format";

const UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hrs" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Sec" },
] as const;

export function Countdown({ net, precision }: { net: string; precision: string }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    if (!isTimed(precision)) return;
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [precision]);

  if (!isTimed(precision)) return null;

  const parts = now == null ? null : countdownParts(net, now);

  return (
    <div className="grid grid-cols-4 gap-2" aria-hidden>
      {UNITS.map((unit) => {
        const value = parts ? parts[unit.key] : null;
        return (
          <div key={unit.key} className="rounded-2xl bg-bg px-1 py-3 text-center">
            <div className="text-2xl font-semibold tabular-nums tracking-tight">
              {value == null ? "––" : unit.key === "days" ? String(value) : padUnit(value)}
            </div>
            <div className="mt-1 text-xs tracking-widest text-muted uppercase">{parts?.past ? "Ago" : unit.label}</div>
          </div>
        );
      })}
    </div>
  );
}

export function LocalNet({ net }: { net: string }) {
  const [label, setLabel] = useState<string | null>(null);
  useEffect(() => {
    setLabel(
      new Intl.DateTimeFormat(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "short",
      }).format(new Date(net)),
    );
  }, [net]);
  if (!label) return null;
  return <p className="text-sm text-muted">{label}</p>;
}
