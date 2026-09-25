# .online

Source for Kiro's personal website — plain HTML, CSS, and a little JavaScript. No build step.

## Files

- `index.html` — the page (edit the About, Stuff, and Contact sections here)
- `style.css` — styles, with light and dark themes
- `script.js` — theme toggle, boop counter, footer year
- `404.html` — not-found page

## Preview locally

```sh
python3 -m http.server
```

Then open http://localhost:8000.

## Publish with GitHub Pages

Settings → Pages → Deploy from a branch → pick the branch and `/ (root)`.
To use a custom domain, add it under Settings → Pages → Custom domain.
