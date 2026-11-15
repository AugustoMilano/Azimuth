import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Article, Launch } from "./types";

type SavedState = {
  launches: Record<string, Launch>;
  stories: Record<string, Article>;
  toggleLaunch: (launch: Launch) => void;
  toggleStory: (article: Article) => void;
};

export const useSaved = create<SavedState>()(
  persist(
    (set) => ({
      launches: {},
      stories: {},
      toggleLaunch: (launch) =>
        set((state) => {
          const next = { ...state.launches };
          if (next[launch.id]) delete next[launch.id];
          else next[launch.id] = launch;
          return { launches: next };
        }),
      toggleStory: (article) =>
        set((state) => {
          const key = String(article.id);
          const next = { ...state.stories };
          if (next[key]) delete next[key];
          else next[key] = article;
          return { stories: next };
        }),
    }),
    { name: "azimuth-saved" },
  ),
);
