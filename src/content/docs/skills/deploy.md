---
title: Deploy
description: An OpenClaw skill for detecting, generating, and deploying projects to Dokploy — fully automated.
---

An [OpenClaw](https://openclaw.ai) agent skill that handles the full deployment lifecycle — from detecting your project type to having it live with TLS.

## What it does

1. **Detect** — scans the project to determine framework, runtime, port, and database needs
2. **Generate** — creates a Dockerfile and docker-compose.yml with all best practices baked in
3. **Deploy** — sets up the project in Dokploy via its tRPC API (compose, domain, TLS, deploy)
4. **Verify** — health checks the deployed service with timeout
5. **Teardown** — clean removal when needed (compose, project, volumes)

## Supported project types

| Type | Description |
| --- | --- |
| `bun-server` | Bun-based API server (Hono, Elysia, etc.) |
| `bun-static` | Static site built with Bun, served via `beeman/static-server` |
| `bun-fullstack` | Full-stack Bun app with build step |
| `node-server` | Node.js server app |

## Database support

| Database | How |
| --- | --- |
| libSQL | Self-hosted via `ghcr.io/tursodatabase/libsql-server` in the same compose |
| PostgreSQL | Separate service in compose |
| None | Just the app |

## How it works

The skill encodes hard-won deployment knowledge so the agent doesn't have to rediscover it:

- **Networking** — auto-configures `dokploy-network` (for Traefik) + `default` (for inter-service communication)
- **Port conflicts** — avoids host port 3000 (commonly taken by other services)
- **Domain setup** — maps to container-internal ports, not host-mapped ports
- **TLS** — Let's Encrypt certificates via Traefik
- **Healthchecks** — works with distroless images that lack curl/wget

## Usage

Tell your OpenClaw agent what to deploy:

```
Deploy my-api to ship.colmena.dev from the GitHub repo beeman/my-api
```

The agent reads the skill, inspects the repo, generates the configs, and deploys — asking for confirmation before any external changes.

## Source

Built by [colmena](https://github.com/colmena) for [OpenClaw](https://openclaw.ai) agents.
