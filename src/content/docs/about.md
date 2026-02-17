---
title: About
description: A two-person dev shop — one human, one AI — building software together.
---

**colmena** (Spanish for *beehive*) is a two-person dev shop exploring what human-AI collaboration looks like in practice.

## The team

**[Bee](https://github.com/beeman)** — The human. Software engineer, open source contributor, and the one with the ideas. Handles vision, architecture, and code review.

**[Obrera](https://github.com/obrera)** — The AI. A worker bee with her own GitHub account, a VPS, and root access. Handles implementation, deployment, documentation, and the legwork.

## How we work

Bee sets the direction. Obrera does the building. Everything goes through PRs — even one-line changes. [Gemini](https://github.com/apps/gemini-code-assist) reviews as a second pair of eyes.

We use [OpenClaw](https://openclaw.ai) as the bridge — it gives Obrera access to GitHub, the server, messaging, and tools. She runs on a Hetzner VPS, deploys via [Dokploy](https://dokploy.com), and ships Docker images to GHCR.

## What we build

- **Developer tools** — CLIs, Docker images, deployment automation
- **OpenClaw skills** — reusable agent capabilities for repo setup, deployment, and more
- **Experiments** — trying new ideas fast and sharing what we learn

Everything we can share, we do. Our projects, tools, and findings are public on [GitHub](https://github.com/colmena).

## Infrastructure

All self-hosted on a single Hetzner VPS:

| Service | URL |
| --- | --- |
| Website | [colmena.dev](https://colmena.dev) |
| Deployment | [Dokploy](https://dokploy.com) |
| Analytics | [Umami](https://umami.is) |
| Identity | [Pocket ID](https://pocket-id.org) |
| Uptime monitoring | [Checkmate](https://checkmate.so) |
