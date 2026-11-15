import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { Poster, SaveStoryButton } from "@/components/bits";
import { formatStamp } from "@/lib/space/format";
import { useSaved } from "@/lib/space/saved";
import { useBriefing } from "@/lib/space/use-briefing";

export const Route = createFileRoute("/story/$id")({
  component: StoryDetail,
});

function StoryDetail() {
  const { id } = Route.useParams();
  const query = useBriefing();
  const saved = useSaved((state) => state.stories[id]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const live = query.data?.articles.find((article) => String(article.id) === id);
  const article = live ?? (mounted ? saved : undefined);

  if (!article) {
    return (
      <div className="px-5 pt-6">
        <Back />
        <p className="mt-8 text-sm text-muted">{mounted && query.data ? "That story isn’t in this briefing." : "Opening story…"}</p>
      </div>
    );
  }

  return (
    <article className="pb-10">
      <div className="flex items-center justify-between px-2 pt-3">
        <Back />
        <SaveStoryButton article={article} />
      </div>
      <div className="px-5">
        <div className="overflow-hidden rounded-card bg-surface">
          <div className="h-56">
            <Poster src={article.image} label={article.site} />
          </div>
        </div>
        <p className="mt-5 text-xs font-medium tracking-widest text-accent uppercase">{article.site}</p>
        <h1 className="mt-2 font-serif text-3xl leading-tight font-medium">{article.title}</h1>
        <p className="mt-3 text-sm text-muted">
          {article.authors ? `${article.authors} · ` : null}
          <span className="tabular-nums">{formatStamp(article.publishedAt)}</span>
        </p>
        {article.summary ? <p className="mt-5 text-base leading-relaxed text-pretty text-fg">{article.summary}</p> : null}
        <a
          href={article.url}
          target="_blank"
          rel="noreferrer"
          className="tap mt-6 flex h-12 items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-on-primary"
        >
          Read at {article.site}
          <ExternalLink className="size-4" />
        </a>
      </div>
    </article>
  );
}

function Back() {
  return (
    <Link to="/news" aria-label="Back to news" className="tap flex size-11 items-center justify-center rounded-full text-fg">
      <ChevronLeft className="size-6" />
    </Link>
  );
}
