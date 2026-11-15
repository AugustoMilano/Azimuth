import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { PageHeader, Poster, SaveLaunchButton, SaveStoryButton } from "@/components/bits";
import { formatNet, formatStamp, utcDay, utcMonth } from "@/lib/space/format";
import { useSaved } from "@/lib/space/saved";
import { useBriefing } from "@/lib/space/use-briefing";
import type { Article, Launch } from "@/lib/space/types";

export const Route = createFileRoute("/saved")({
  head: () => ({ meta: [{ title: "Saved · Azimuth" }] }),
  component: SavedPage,
});

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

function SavedPage() {
  const mounted = useMounted();
  const briefing = useBriefing();
  const launches = useSaved((state) => state.launches);
  const stories = useSaved((state) => state.stories);
  const live = briefing.data?.launches ?? [];

  const savedLaunches = Object.values(launches)
    .map((launch) => live.find((item) => item.id === launch.id) ?? launch)
    .sort((a, b) => +new Date(a.net) - +new Date(b.net));
  const savedStories = Object.values(stories).sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
  const empty = savedLaunches.length === 0 && savedStories.length === 0;

  return (
    <div className="space-y-5 pb-8">
      <PageHeader title="Saved" />
      <p className="px-5 text-sm text-muted">Pins stay on this device.</p>
      {!mounted ? <p className="px-5 text-sm text-muted">Opening pins…</p> : null}
      {mounted && empty ? (
        <div className="mx-5 rounded-card bg-surface px-5 py-10 text-center">
          <Bookmark className="mx-auto size-6 text-primary" />
          <p className="mt-3 text-sm text-muted">Nothing pinned yet. Save a launch or a story and it will wait here.</p>
        </div>
      ) : null}
      {mounted && savedLaunches.length > 0 ? (
        <section className="space-y-2 px-5">
          <h2 className="px-1 text-xs font-medium tracking-widest text-muted uppercase">Launches</h2>
          <ul className="overflow-hidden rounded-card bg-surface">
            {savedLaunches.map((launch, index) => (
              <li key={launch.id} className={index > 0 ? "border-t border-line" : undefined}>
                <SavedLaunchRow launch={launch} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {mounted && savedStories.length > 0 ? (
        <section className="space-y-2 px-5">
          <h2 className="px-1 text-xs font-medium tracking-widest text-muted uppercase">News</h2>
          <ul className="overflow-hidden rounded-card bg-surface">
            {savedStories.map((article, index) => (
              <li key={article.id} className={index > 0 ? "border-t border-line" : undefined}>
                <SavedStoryRow article={article} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

function SavedLaunchRow({ launch }: { launch: Launch }) {
  return (
    <div className="flex items-center">
      <Link to="/launch/$id" params={{ id: launch.id }} className="flex min-w-0 flex-1 items-center gap-3 py-3 pr-1 pl-3">
        <div className="w-12 shrink-0 text-center">
          <div className="text-xs font-medium tracking-wider text-muted uppercase">{utcMonth(launch.net)}</div>
          <div className="text-xl font-semibold tabular-nums leading-tight">{utcDay(launch.net)}</div>
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{launch.mission}</p>
          <p className="truncate text-xs text-muted">{formatNet(launch.net, launch.precision)}</p>
        </div>
      </Link>
      <div className="pr-1">
        <SaveLaunchButton launch={launch} />
      </div>
    </div>
  );
}

function SavedStoryRow({ article }: { article: Article }) {
  return (
    <div className="flex items-center">
      <Link to="/story/$id" params={{ id: String(article.id) }} className="flex min-w-0 flex-1 items-center gap-3 py-3 pl-3">
        <div className="size-14 shrink-0 overflow-hidden rounded-2xl">
          <Poster src={article.image} label={article.site} />
        </div>
        <div className="min-w-0">
          <p className="line-clamp-2 font-serif text-base leading-snug font-medium">{article.title}</p>
          <p className="mt-1 text-xs text-muted tabular-nums">{formatStamp(article.publishedAt)}</p>
        </div>
      </Link>
      <div className="pr-1">
        <SaveStoryButton article={article} />
      </div>
    </div>
  );
}
