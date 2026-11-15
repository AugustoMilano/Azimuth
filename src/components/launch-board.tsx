import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { FeedNote, PageHeader, Poster, RefreshButton, SaveLaunchButton, SearchField, StatusChip } from "@/components/bits";
import { Countdown, LocalNet } from "@/components/countdown";
import { cn } from "@/lib/cn";
import { formatNet, isCoarse, isTimed, utcDay, utcMonth } from "@/lib/space/format";
import { matchesLaunch, splitLaunches } from "@/lib/space/select";
import type { Launch, LaunchFilter } from "@/lib/space/types";
import { useBriefing } from "@/lib/space/use-briefing";

const FILTERS: { id: LaunchFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "go", label: "Go" },
  { id: "crewed", label: "Crewed" },
  { id: "science", label: "Science" },
];

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

      {groups.onDeck.length > 0 ? (
        <LaunchSection title="On deck" launches={groups.onDeck} />
      ) : null}
      {groups.months.length > 0 ? (
        <LaunchSection title="Month windows" launches={groups.months} coarse />
      ) : null}
      {!filtering && groups.past.length > 0 ? (
        <LaunchSection title="Just flew" launches={groups.past} />
      ) : null}

      <p className="px-5 text-xs text-muted">Launches from The Space Devs. News from the Spaceflight News API.</p>
    </div>
  );
}

function NextLaunch({ launch }: { launch: Launch }) {
  return (
    <article className="overflow-hidden rounded-card border border-line bg-surface">
      <div className="h-1 bg-primary" />
      <div className="relative h-52">
        <Poster src={launch.image} label={launch.vehicle} />
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

function LaunchSection({ title, launches, coarse = false }: { title: string; launches: Launch[]; coarse?: boolean }) {
  return (
    <section className="space-y-2 px-5">
      <h2 className="px-1 text-xs font-medium tracking-widest text-muted uppercase">{title}</h2>
      <ul className="overflow-hidden rounded-card bg-surface">
        {launches.map((launch, index) => (
          <li key={launch.id} className={index > 0 ? "border-t border-line" : undefined}>
            <div className="flex items-center">
              <Link
                to="/launch/$id"
                params={{ id: launch.id }}
                className="flex min-w-0 flex-1 items-center gap-3 py-3 pr-1 pl-3"
              >
                <div className="w-12 shrink-0 text-center">
                  <div className="text-xs font-medium tracking-wider text-muted uppercase">{utcMonth(launch.net)}</div>
                  <div className="text-xl font-semibold tabular-nums leading-tight">
                    {coarse || isCoarse(launch.precision) ? "NET" : utcDay(launch.net)}
                  </div>
                </div>
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
          </li>
        ))}
      </ul>
    </section>
  );
}
