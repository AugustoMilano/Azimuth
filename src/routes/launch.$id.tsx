import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { Poster, SaveLaunchButton, StatusChip } from "@/components/bits";
import { Countdown, LocalNet } from "@/components/countdown";
import { formatNet, formatWindow, isTimed } from "@/lib/space/format";
import { useSaved } from "@/lib/space/saved";
import { useBriefing } from "@/lib/space/use-briefing";

export const Route = createFileRoute("/launch/$id")({
  component: LaunchDetail,
});

function LaunchDetail() {
  const { id } = Route.useParams();
  const query = useBriefing();
  const saved = useSaved((state) => state.launches[id]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const live = query.data?.launches.find((launch) => launch.id === id);
  const launch = live ?? (mounted ? saved : undefined);

  if (!launch) {
    return (
      <div className="px-5 pt-6">
        <Back />
        <p className="mt-8 text-sm text-muted">{mounted && query.data ? "That flight isn’t in the current range." : "Opening flight card…"}</p>
      </div>
    );
  }

  const windowLabel = formatWindow(launch.windowStart, launch.windowEnd);
  const facts = [
    ["Provider", launch.provider],
    ["Vehicle", launch.vehicle],
    ["Pad", launch.pad],
    ["Location", launch.location],
    ["Type", launch.missionType],
    ["NET", formatNet(launch.net, launch.precision)],
    windowLabel ? ["Window", windowLabel] : null,
  ].filter((row): row is [string, string] => row !== null);

  return (
    <article className="pb-10">
      <div className="flex items-center justify-between px-2 pt-3">
        <Back />
        <SaveLaunchButton launch={launch} />
      </div>
      <div className="px-5">
        <div className="overflow-hidden rounded-card border border-line bg-surface">
          <div className="h-1 bg-primary" />
          <div className="relative h-56">
            <Poster src={launch.image} label={launch.vehicle} />
            <div className="absolute top-3 left-3">
              <StatusChip abbrev={launch.statusAbbrev} status={launch.status} />
            </div>
          </div>
          <div className="space-y-4 p-4">
            <div>
              <p className="text-xs font-medium tracking-widest text-muted uppercase">{launch.vehicle}</p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight">{launch.mission}</h1>
              <p className="mt-2 text-sm text-muted">{launch.location}</p>
            </div>
            <Countdown net={launch.net} precision={launch.precision} />
            {isTimed(launch.precision) ? <LocalNet net={launch.net} /> : null}
            {launch.statusDetail ? <p className="text-sm text-pretty text-muted">{launch.statusDetail}</p> : null}
          </div>
        </div>
        <dl className="mt-4 overflow-hidden rounded-card bg-surface">
          {facts.map(([label, value], index) => (
            <div key={label} className={index > 0 ? "flex items-baseline justify-between gap-4 border-t border-line px-4 py-3" : "flex items-baseline justify-between gap-4 px-4 py-3"}>
              <dt className="shrink-0 text-sm text-muted">{label}</dt>
              <dd className="text-right text-sm font-medium">{value}</dd>
            </div>
          ))}
        </dl>
        <a
          href={launch.url}
          target="_blank"
          rel="noreferrer"
          className="tap mt-4 flex h-12 items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-on-primary"
        >
          Launch record
          <ExternalLink className="size-4" />
        </a>
      </div>
    </article>
  );
}

function Back() {
  return (
    <Link to="/" aria-label="Back to launches" className="tap flex size-11 items-center justify-center rounded-full text-fg">
      <ChevronLeft className="size-6" />
    </Link>
  );
}
