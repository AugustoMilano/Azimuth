import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { FeedNote, PageHeader, Poster, RefreshButton, SaveStoryButton, SearchField } from "@/components/bits";
import { formatStamp } from "@/lib/space/format";
import { matchesArticle } from "@/lib/space/select";
import type { Article } from "@/lib/space/types";
import { useBriefing } from "@/lib/space/use-briefing";

export function NewsBoard() {
  const query = useBriefing();
  const [search, setSearch] = useState("");
  const data = query.data;
  if (!data) return null;
  const articles = data.articles.filter((article) => matchesArticle(article, search));
  const [lead, ...rest] = articles;

  return (
    <div className="space-y-5 pb-6">
      <PageHeader title="News" action={<RefreshButton pending={query.isFetching} onClick={() => void query.refetch()} />} />
      <FeedNote fetchedAt={data.fetchedAt} source={data.source} />
      <SearchField value={search} onChange={setSearch} placeholder="Search dispatches" />
      {lead ? (
        <div className="px-5">
          <LeadStory article={lead} />
        </div>
      ) : (
        <p className="px-5 text-sm text-muted">No dispatches match that.</p>
      )}
      {rest.length > 0 ? (
        <ul className="mx-5 overflow-hidden rounded-card bg-surface">
          {rest.map((article, index) => (
            <li key={article.id} className={index > 0 ? "border-t border-line" : undefined}>
              <StoryRow article={article} />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function LeadStory({ article }: { article: Article }) {
  return (
    <article className="overflow-hidden rounded-card border border-line bg-surface">
      <Link to="/story/$id" params={{ id: String(article.id) }} className="block">
        <div className="relative h-48">
          <Poster src={article.image} label={article.site} alt={`${article.title}, from ${article.site}`} />
        </div>
        <div className="space-y-2 p-4">
          <p className="text-xs font-medium tracking-widest text-accent uppercase">{article.site}</p>
          <h2 className="font-serif text-2xl leading-tight font-medium">{article.title}</h2>
          {article.summary ? <p className="line-clamp-3 text-sm text-muted">{article.summary}</p> : null}
          <p className="text-xs text-muted tabular-nums">{formatStamp(article.publishedAt)}</p>
        </div>
      </Link>
      <div className="flex justify-end px-2 pb-2">
        <SaveStoryButton article={article} />
      </div>
    </article>
  );
}

function StoryRow({ article }: { article: Article }) {
  return (
    <div className="flex items-center">
      <Link to="/story/$id" params={{ id: String(article.id) }} className="flex min-w-0 flex-1 items-center gap-3 py-3 pl-3">
        <div className="size-16 shrink-0 overflow-hidden rounded-2xl">
          <Poster src={article.image} label={article.site} alt={`${article.title}, from ${article.site}`} />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium tracking-wide text-accent uppercase">{article.site}</p>
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
