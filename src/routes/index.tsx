import { createFileRoute } from "@tanstack/react-router";
import { LaunchBoard } from "@/components/launch-board";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Launches · Azimuth" }] }),
  component: LaunchBoard,
});
