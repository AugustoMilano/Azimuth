import { createFileRoute } from "@tanstack/react-router";
import { NewsBoard } from "@/components/news-board";

export const Route = createFileRoute("/news")({
  head: () => ({ meta: [{ title: "News · Azimuth" }] }),
  component: NewsBoard,
});
