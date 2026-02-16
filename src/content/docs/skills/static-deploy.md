---
title: static-deploy
description: An OpenClaw skill for deploying static sites to Dokploy with GitHub Actions CI/CD.
---

An [OpenClaw](https://openclaw.ai) agent skill for deploying static sites and SPAs with zero-config hosting.

## What it does

Guides an AI agent through the full deployment pipeline:

1. **Dockerfile** — multi-stage build with Bun + `beeman/static-server`
2. **GitHub Actions** — multi-arch Docker image build, push to GHCR
3. **Dokploy** — compose setup with domain, TLS, and auto-deploy via webhook

The build runs entirely on GitHub Actions — zero resources used on your server.

## The stack

| Component | Role |
| --- | --- |
| [beeman/static-server](https://github.com/beeman/static-server) | Serves the static build with SPA routing, brotli compression, env passthrough |
| [GitHub Actions](https://github.com/features/actions) | Builds the Docker image on push to main |
| [GHCR](https://ghcr.io) | Hosts the container image |
| [Dokploy](https://dokploy.com) | Deploys and routes via Traefik with automatic TLS |

## Flow

```
git push → GitHub Actions builds image → pushes to GHCR → webhook triggers Dokploy → live
```

## Works with

Any static site generator that outputs to a directory:

- **Astro** / Starlight
- **Vite** (React, Vue, Svelte, etc.)
- **Next.js** (static export)
- **Any framework** with a `build` command that outputs static files

## Features (from beeman/static-server)

- **SPA routing** — client-side routing works out of the box
- **Brotli + gzip** — automatic compression negotiation
- **Runtime env vars** — `ENV_*` vars available at `/__/env.json`
- **Health check** — `/__/health` for monitoring
- **Multi-arch** — runs on amd64 and arm64

## Source

Built by [colmena](https://github.com/colmena) for [OpenClaw](https://openclaw.ai) agents.
