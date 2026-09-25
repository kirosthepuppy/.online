# .online

Source for Kiro's personal website — plain HTML, CSS, and a little JavaScript. No build step.

free to use, 


## Files

Everything the site serves lives in `public/`:

- `public/index.html` — the home page (edit the About, Stuff, and Contact sections here)
- `public/portfolio.html` — portfolio page (copy a `work` card to add a piece)
- `public/style.css` — styles, with light and dark themes
- `public/script.js` — theme toggle, boop counter, video player, footer year
- `public/privacy.html`, `public/cookies.html`, `public/terms.html` — legal pages linked in the footer (update the "Last updated" date when you change them)
- `public/404.html` — not-found page
- `public/images/` — artwork and photos used across the page

`wrangler.jsonc` tells Cloudflare to serve `public/` as a static site.

## Preview locally

```sh
cd public && python3 -m http.server
```

Then open http://localhost:8000.

## Publish

The site is hosted on Cloudflare Workers, connected to this repo. Every push to
`main` deploys automatically. No build step.
