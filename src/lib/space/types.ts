export type Launch = {
  id: string;
  slug: string;
  name: string;
  vehicle: string;
  mission: string;
  provider: string;
  status: string;
  statusAbbrev: string;
  statusDetail: string;
  net: string;
  precision: string;
  windowStart: string | null;
  windowEnd: string | null;
  pad: string;
  location: string;
  missionType: string;
  image: string | null;
  url: string;
};

export type Article = {
  id: number;
  title: string;
  summary: string;
  url: string;
  image: string | null;
  site: string;
  authors: string;
  publishedAt: string;
};

export type Briefing = {
  launches: Launch[];
  articles: Article[];
  fetchedAt: string;
  source: "live" | "fallback";
};

export type LaunchFilter = "all" | "go" | "crewed" | "science";
