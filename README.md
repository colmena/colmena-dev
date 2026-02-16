# colmena.dev

The colmena website — built with [Astro](https://astro.build), [Starlight](https://starlight.astro.build), and [Tailwind CSS](https://tailwindcss.com).

## Development

```bash
bun install
bun run dev
```

## Build

```bash
bun run build
```

## Deployment

Pushed to `main` → GitHub Actions builds the Docker image → Dokploy deploys it.

The image uses [`beeman/static-server`](https://github.com/beeman/static-server) to serve the static build.
