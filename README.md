# The Support Stock System (Refactored)

Clean architecture refactor prepared for static hosting (Netlify). The original monolithic `index.html.html` has been split into styles, scripts (ES modules), API helpers, and HTML components.

## Structure

```
project-root/
├── index.html
├── styles/
│   ├── base.css
│   ├── layout.css
│   └── theme.css
├── scripts/
│   ├── main.js
│   ├── dashboard.js
│   ├── products.js
│   ├── vendors.js
│   ├── projects.js
│   ├── purchase.js
│   ├── issue.js
│   ├── reports.js
│   └── modules/
│       ├── layout.js
│       ├── tabs.js
│       ├── refresh.js
│       └── data.js
├── api/
│   ├── config.js
│   └── fetchData.js
├── components/
│   ├── modal.html
│   ├── sidebar.html
│   └── header.html
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── netlify.toml
└── README.md
```

## Development

- Open `index.html` in a local static server (e.g. `npx serve .`).
- The page uses ES modules; a modern browser is required.
- Tailwind is loaded via CDN; you can switch to a precompiled CSS pipeline later if desired.

## Deployment (Netlify)

- This is a static site; no build step required. Netlify config:
  - `publish = .`
  - Redirect included to map legacy `/index.html.html` to `/index.html`.
- Drag-and-drop this folder into Netlify, or connect the repo and set build command to empty.

## API Configuration

- Update `api/config.js` with your Google Apps Script Web App URLs:
  - `READ_API`
  - `WRITE_API`

## Notes

- Feature modules (`dashboard.js`, `vendors.js`, etc.) currently export stubs. Port your rendering logic from the old file into these modules gradually.
- Components are simple HTML partials included at runtime via `fetch()` for static hosting compatibility.
