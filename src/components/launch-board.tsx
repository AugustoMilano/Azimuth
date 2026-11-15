import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";
import { FeedNote, PageHeader, Poster, RefreshButton, SaveLaunchButton, SearchField, StatusChip } from "@/components/bits";
import { Countdown, LocalNet } from "@/components/countdown";
import { GlassOrb } from "@/components/sky";
import { cn } from "@/lib/cn";
import { formatNet, isCoarse, isTimed, utcClock, utcDay, utcDayHeading, utcMonth, utcMonthHeading } from "@/lib/space/format";
import { matchesLaunch, splitLaunches } from "@/lib/space/select";
import type { Launch, LaunchFilter } from "@/lib/space/types";
import { useBriefing } from "@/lib/space/use-briefing";

const FILTERS: { id: LaunchFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "go", label: "Go" },
  { id: "crewed", label: "Crewed" },
  { id: "science", label: "Science" },
];

const DECK_PREVIEW = 4;

export function LaunchBoard() {
  const query = useBriefing();
  const [filter, setFilter] = useState<LaunchFilter>("all");
  const [search, setSearch] = useState("");
  const data = query.data;
  if (!data) return null;

  const matched = data.launches.filter((launch) => matchesLaunch(launch, filter, search));
  const groups = splitLaunches(matched);
  const filtering = filter !== "all" || search.trim().length > 0;

  return (
    <div className="space-y-5 pb-6">
      <PageHeader
        title="Launches"
        mark={<GlassOrb />}
        action={<RefreshButton pending={query.isFetching} onClick={() => void query.refetch()} />}
      />
      <FeedNote fetchedAt={data.fetchedAt} source={data.source} />
      <SearchField value={search} onChange={setSearch} placeholder="Vehicle, pad, provider" />
      <div className="flex gap-2 overflow-x-auto px-5 pb-1" role="group" aria-label="Filter launches">
        {FILTERS.map((item) => {
          const active = filter === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(item.id)}
              className={cn(
                "tap h-11 shrink-0 rounded-full px-4 text-sm font-medium",
                active ? "bg-primary text-on-primary" : "bg-surface-2 text-fg",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {groups.next ? (
        <div className="px-5">
          <NextLaunch launch={groups.next} />
        </div>
      ) : (
        <p className="px-5 text-sm text-muted">Nothing on the range matches that.</p>
      )}

      {groups.onDeck.length > 0 ? <DeckSection launches={groups.onDeck} collapse={!filtering} /> : null}
      {groups.months.length > 0 ? <MonthSection launches={groups.months} collapse={!filtering} /> : null}
      {!filtering && groups.past.length > 0 ? <LaunchSection title="Just flew" launches={groups.past} /> : null}

      <p className="px-5 text-xs text-muted">Launches from The Space Devs. News from the Spaceflight News API.</p>
    </div>
  );
}

function NextLaunch({ launch }: { launch: Launch }) {
  return (
    <article className="overflow-hidden rounded-card border border-line bg-surface">
      <div className="h-1 bg-primary" />
      <div className="relative h-52">
        <Poster src={launch.image} label={launch.vehicle} alt={`${launch.mission} on a ${launch.vehicle}`} />
        <div className="scrim pointer-events-none absolute inset-0" />
        <div className="absolute top-3 left-3">
          <StatusChip abbrev={launch.statusAbbrev} status={launch.status} />
        </div>
      </div>
      <div className="space-y-4 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs font-medium tracking-widest text-muted uppercase">{launch.vehicle}</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">
              <Link to="/launch/$id" params={{ id: launch.id }} className="hover:text-primary">
                {launch.mission}
              </Link>
            </h2>
            <p className="mt-1 text-sm text-muted">
              {launch.provider} · {launch.pad}
            </p>
          </div>
          <SaveLaunchButton launch={launch} />
        </div>
        <Countdown net={launch.net} precision={launch.precision} />
        <div>
          <p className="text-sm font-medium tabular-nums">{formatNet(launch.net, launch.precision)}</p>
          {isTimed(launch.precision) ? <LocalNet net={launch.net} /> : null}
          {!isTimed(launch.precision) ? (
            <p className="text-sm text-muted">{isCoarse(launch.precision) ? "Month only — no T-0 yet." : "Day set, hour not published."}</p>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function groupBy(launches: Launch[], keyOf: (launch: Launch) => string) {
  const groups: { key: string; launches: Launch[] }[] = [];
  for (const launch of launches) {
    const key = keyOf(launch);
    const last = groups[groups.length - 1];
    if (last?.key === key) last.launches.push(launch);
    else groups.push({ key, launches: [launch] });
  }
  return groups;
}

function dayKey(iso: string) {
  const d = new Date(iso);
  return `${d.getUTCFullYear()}-${d.getUTCMonth()}-${d.getUTCDate()}`;
}

function monthKey(iso: string) {
  const d = new Date(iso);
  return `${d.getUTCFullYear()}-${d.getUTCMonth()}`;
}

function DeckSection({ launches, collapse }: { launches: Launch[]; collapse: boolean }) {
  const [open, setOpen] = useState(false);
  const shown = collapse && !open ? launches.slice(0, DECK_PREVIEW) : launches;
  const hidden = launches.length - shown.length;
  const days = groupBy(shown, (launch) => dayKey(launch.net));

  return (
    <section className="space-y-2 px-5">
      <h2 className="px-1 text-xs font-medium tracking-widest text-muted uppercase">On deck</h2>
      <ul className="overflow-hidden rounded-card bg-surface">
        {days.map((day) => (
          <li key={day.key} className="border-t border-line first:border-t-0">
            <div className="px-3 py-2 text-xs font-medium tracking-wide text-muted">
              {utcDayHeading(day.launches[0].net)}
            </div>
            <ul>
              {day.launches.map((launch) => (
                <li key={launch.id} className="border-t border-line">
                  <LaunchRow
                    launch={launch}
                    leading={
                      <div className="w-12 shrink-0 text-center text-xs font-medium tabular-nums text-muted">
                        {isTimed(launch.precision) ? utcClock(launch.net) : "TBD"}
                      </div>
                    }
                  />
                </li>
              ))}
            </ul>
          </li>
        ))}
        {collapse && launches.length > DECK_PREVIEW ? (
          <li className="border-t border-line">
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className="tap flex h-12 w-full items-center justify-center text-sm font-medium text-primary"
            >
              {open ? "Show less" : `Show ${hidden} more`}
            </button>
          </li>
        ) : null}
      </ul>
    </section>
  );
}

function MonthSection({ launches, collapse }: { launches: Launch[]; collapse: boolean }) {
  const months = groupBy(launches, (launch) => monthKey(launch.net));
  const [open, setOpen] = useState<Record<string, boolean>>({});

  return (
    <section className="space-y-2 px-5">
      <h2 className="px-1 text-xs font-medium tracking-widest text-muted uppercase">Month windows</h2>
      <ul className="overflow-hidden rounded-card bg-surface">
        {months.map((month, index) => {
          const expanded = collapse ? Boolean(open[month.key]) : true;
          return (
            <li key={month.key} className={index > 0 ? "border-t border-line" : undefined}>
              {collapse ? (
                <button
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => setOpen((value) => ({ ...value, [month.key]: !value[month.key] }))}
                  className="tap flex w-full items-center gap-3 px-3 py-3 text-left"
                >
                  <span className="min-w-0 flex-1 text-sm font-medium">{utcMonthHeading(month.launches[0].net)}</span>
                  <span className="rounded-full bg-surface-2 px-2 py-0.5 text-xs tabular-nums text-muted">{month.launches.length}</span>
                  <ChevronDown className={cn("size-4 text-muted transition-transform", expanded && "rotate-180")} />
                </button>
              ) : (
                <div className="px-3 py-3 text-sm font-medium">{utcMonthHeading(month.launches[0].net)}</div>
              )}
              {expanded ? (
                <ul className="border-t border-line">
                  {month.launches.map((launch, launchIndex) => (
                    <li key={launch.id} className={launchIndex > 0 ? "border-t border-line" : undefined}>
                      <LaunchRow launch={launch} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function LaunchSection({ title, launches }: { title: string; launches: Launch[] }) {
  return (
    <section className="space-y-2 px-5">
      <h2 className="px-1 text-xs font-medium tracking-widest text-muted uppercase">{title}</h2>
      <ul className="overflow-hidden rounded-card bg-surface">
        {launches.map((launch, index) => (
          <li key={launch.id} className={index > 0 ? "border-t border-line" : undefined}>
            <LaunchRow
              launch={launch}
              leading={
                <div className="w-12 shrink-0 text-center">
                  <div className="text-xs font-medium tracking-wider text-muted uppercase">{utcMonth(launch.net)}</div>
                  <div className="text-xl font-semibold tabular-nums leading-tight">
                    {isCoarse(launch.precision) ? "NET" : utcDay(launch.net)}
                  </div>
                </div>
              }
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

function LaunchRow({ launch, leading }: { launch: Launch; leading?: ReactNode }) {
  return (
    <div className="flex items-center">
      <Link to="/launch/$id" params={{ id: launch.id }} className="flex min-w-0 flex-1 items-center gap-3 py-3 pr-1 pl-3">
        {leading}
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{launch.mission}</p>
          <p className="truncate text-xs text-muted">
            <span className={launch.statusAbbrev === "Go" ? "text-primary" : undefined}>{launch.statusAbbrev}</span>
            {" · "}
            {launch.vehicle}
          </p>
        </div>
      </Link>
      <div className="pr-1">
        <SaveLaunchButton launch={launch} />
      </div>
    </div>
  );
}
