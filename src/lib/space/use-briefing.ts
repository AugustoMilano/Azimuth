import { useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { getBriefing } from "./briefing";

const rootRoute = getRouteApi("__root__");

export function useBriefing() {
  const initial = rootRoute.useLoaderData();
  return useQuery({
    queryKey: ["briefing"],
    queryFn: () => getBriefing(),
    initialData: initial,
    initialDataUpdatedAt: Date.parse(initial.fetchedAt),
    staleTime: initial.source === "fallback" ? 20_000 : 5 * 60 * 1000,
  });
}
