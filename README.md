# Azimuth

Upcoming space launches and recent space news.

The next launch has a live countdown in UTC and your local time. Filter by go, crewed, or science, or search by vehicle, pad, or provider. News links out to the original story. Bookmarks stay in this browser.


<p align="center">
  <img src="screenshots/launches.png" width="220" alt="Launches tab. A live countdown to Amazon Leo on a Vulcan rocket at Space Launch Complex 41, with All, Go, Crewed, and Science filters." />
  <img src="screenshots/news.png" width="220" alt="News tab. The lead story is Ars Technica on SpaceX catching a Starship, followed by a SpacePolicyOnline dispatch." />
  <img src="screenshots/saved.png" width="220" alt="Saved tab. A pinned Amazon Leo launch on November 15 and a pinned story about the Starship catch." />
</p>

## Run

```bash
npm install
npm run dev
```

The dev server listens on port 8080.

## Data

- Launches from the [Launch Library 2](https://thespacedevs.com/llapi) API
- News from the [Spaceflight News API](https://api.spaceflightnewsapi.net/)

If a feed is unavailable, the app falls back to a briefing packed in the repo.

## License

[MIT](LICENSE)

