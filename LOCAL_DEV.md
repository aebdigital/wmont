# Local development

Use one of these scripts:

```bash
npm run dev
```

Starts the local site on `http://127.0.0.1:3007`.

```bash
npm run check
```

Runs TypeScript checks without touching the running dev server.

```bash
npm run dev:clean
```

Clears `.next` and starts a fresh dev server on `3007`.

Avoid running `npm run build` while `npm run dev` is open. Next.js writes both dev and production output into `.next`, so a production build can replace chunks that the running dev server is still using. If you need a production build, stop the dev server first, run `npm run build`, then restart with `npm run dev`.
