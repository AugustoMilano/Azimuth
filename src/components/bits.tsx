import { Bookmark, RefreshCw, Search, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { cn } from "@/lib/cn";
import { useSaved } from "@/lib/space/saved";
import type { Article, Launch } from "@/lib/space/types";

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

export function PageHeader({ title, action, mark }: { title: string; action?: ReactNode; mark?: ReactNode }) {
  return (
    <header className="flex items-end justify-between gap-3 px-5 pt-6 pb-2">
      <div className="flex min-w-0 items-end gap-3">
        {mark}
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase">Azimuth</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">{title}</h1>
        </div>
      </div>
      {action}
    </header>
  );
}

export function RefreshButton({ pending, onClick }: { pending: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Refresh briefing"
      className="tap flex size-11 items-center justify-center rounded-full bg-surface-2 text-fg"
    >
      <RefreshCw className={cn("size-5", pending && "animate-spin")} />
    </button>
  );
}

export function SearchField({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="mx-5 flex h-12 items-center gap-2 rounded-full bg-surface-2 px-4 focus-within:ring-2 focus-within:ring-primary/50">
      <Search className="size-4 shrink-0 text-muted" aria-hidden />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type="text"
        enterKeyHint="search"
        autoComplete="off"
        className="min-w-0 flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-muted"
      />
      {value ? (
        <button type="button" aria-label="Clear search" onClick={() => onChange("")} className="tap -mr-2 flex size-11 items-center justify-center text-muted">
          <X className="size-4" />
        </button>
      ) : null}
    </label>
  );
}

export function StatusChip({ abbrev, status }: { abbrev: string; status: string }) {
  const hot = abbrev === "Go" || abbrev === "In Flight";
  const done = abbrev === "Success";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        hot && "bg-primary text-on-primary",
        done && "bg-accent text-bg",
        !hot && !done && "bg-surface-3 text-fg",
      )}
    >
      {hot ? <span className="live-dot size-1.5 rounded-full bg-on-primary" /> : null}
      {status}
    </span>
  );
}

export function SaveLaunchButton({ launch }: { launch: Launch }) {
  const mounted = useMounted();
  const saved = useSaved((state) => Boolean(state.launches[launch.id]));
  const toggle = useSaved((state) => state.toggleLaunch);
  const show = mounted && saved;
  return (
    <button
      type="button"
      aria-pressed={show}
      aria-label={show ? `Remove ${launch.mission} from saved` : `Save ${launch.mission}`}
      onClick={() => toggle(launch)}
      className="tap flex size-11 shrink-0 items-center justify-center rounded-full"
    >
      <Bookmark className={cn("size-5", show ? "fill-primary text-primary" : "text-muted")} />
    </button>
  );
}

export function SaveStoryButton({ article }: { article: Article }) {
  const mounted = useMounted();
  const saved = useSaved((state) => Boolean(state.stories[String(article.id)]));
  const toggle = useSaved((state) => state.toggleStory);
  const show = mounted && saved;
  return (
    <button
      type="button"
      aria-pressed={show}
      aria-label={show ? `Remove ${article.title} from saved` : `Save ${article.title}`}
      onClick={() => toggle(article)}
      className="tap flex size-11 shrink-0 items-center justify-center rounded-full"
    >
      <Bookmark className={cn("size-5", show ? "fill-primary text-primary" : "text-muted")} />
    </button>
  );
}

export function FeedNote({ fetchedAt, source }: { fetchedAt: string; source: "live" | "fallback" }) {
  const [label, setLabel] = useState("live");
  useEffect(() => {
    if (source === "fallback") return;
    const update = () => setLabel(formatDistanceToNowStrict(new Date(fetchedAt), { addSuffix: true }));
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, [fetchedAt, source]);

  return (
    <p className="px-5 text-xs text-muted">
      {source === "fallback" ? "Range feed is quiet — showing the packed briefing." : `Updated ${label}`}
      <span> · times in UTC</span>
    </p>
  );
}

export function Poster({ src, label, alt, className }: { src: string | null; label: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  const letters = label
    .split(/\s+/)
    .filter((word) => /[A-Za-z0-9]/.test(word[0] ?? ""))
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  if (!src || failed) {
    return (
      <div role="img" aria-label={alt} className={cn("flex h-full w-full items-center justify-center bg-surface-3 text-accent", className)}>
        <span className="text-2xl font-semibold tracking-widest" aria-hidden>
          {letters || "AZ"}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      referrerPolicy="no-referrer"
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
