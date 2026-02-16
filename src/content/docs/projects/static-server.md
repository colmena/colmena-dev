---
title: static-server
description: A Docker image for serving static sites and SPAs with runtime env passthrough.
---

A reusable Docker image for serving static sites and SPAs — no per-project Dockerfile needed.

## Links

- **Docker Hub:** [`beeman/static-server`](https://hub.docker.com/r/beeman/static-server)
- **GHCR:** [`ghcr.io/beeman/static-server`](https://github.com/beeman/static-server/pkgs/container/static-server)
- **Source:** [github.com/beeman/static-server](https://github.com/beeman/static-server)

## What it does

Mount your `dist/` folder, set some env vars, done. The server handles:

- **SPA routing** — unknown routes serve `index.html` (default on, set `SPA=false` to disable)
- **Brotli + gzip compression** — automatic, best encoding negotiated with the client
- **Environment passthrough** — `ENV_*` vars are exposed at `/__/env.json` and `/__/env.js`
- **Health check** — `GET /__/health` returns `{"status":"ok"}`
- **HTTP Basic Auth** — set `HTTP_AUTH_USER` and `HTTP_AUTH_PASS`

## Quick start

```yaml
services:
  web:
    image: beeman/static-server:latest
    volumes:
      - ./dist:/workspace/app:ro
    ports:
      - 9876:9876
    environment:
      - ENV_API_URL=https://api.example.com
```

## History

Originally created in 2016 as a thin wrapper around [superstatic](https://github.com/firebase/superstatic). Revived and modernized in February 2026 with brotli compression, SPA mode, health endpoints, multi-arch builds, and a proper CI pipeline.
