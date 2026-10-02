# Arlotech website (v2 redesign)

React + TypeScript + Vite, plain CSS. No Tailwind, no UI library, no router package.

## Deploying (cPanel)

`dist/` is already built. Upload **the contents** of `dist/` to `public_html`.

> **Important:** do NOT overwrite these on the server, they hold your live data:
> - `api/posts.json` (posts created in /admin)
> - `uploads/` (images uploaded in /admin)
> - `api/reviews-store.php` (submitted and moderated reviews)
>
> Keep your existing `api/config.php` (admin password) as it is. It is intentionally excluded from Git.

For a first deployment, copy `api/config.example.php` to `api/config.php` on the server and replace the placeholder with a long, unique password before enabling the admin panel. Never commit `api/config.php`.

The review form and moderation queue require PHP on the hosting server. Vite's local dev server serves the UI but does not execute PHP endpoints.

## Working on it locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # rebuilds dist/
```

## Where to change things

| What | File |
| --- | --- |
| Projects (add/remove/edit) | `src/data/projects.ts` |
| Services, stats, team, process, contact details | `src/data/site.ts` |
| Photos (Unsplash IDs + credits) | `src/data/images.ts` |
| Blog posts | `src/data/posts.ts` (or /admin on the live site) |
| Client reviews | `api/reviews-store.php` and /admin on the live site |
| Colours, fonts, spacing | top of `src/styles.css` (`:root`) |

Projects have no live links on purpose. To show a "Visit live site" button, add `href: "https://..."` to that project.

Only the three team portraits live in this project (`public/logos`). All other photos load from Unsplash.
