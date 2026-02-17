---
title: Checkmate
description: An OpenClaw skill for managing uptime monitoring via the Checkmate REST API.
---

An [OpenClaw](https://openclaw.ai) agent skill for managing [Checkmate](https://github.com/bluewave-labs/checkmate) — an open-source uptime monitoring tool with a proper REST API.

## Why Checkmate

We evaluated several monitoring tools for agent-friendly workflows:

| Tool | API | Verdict |
| --- | --- | --- |
| **Uptime Kuma** | Socket.IO only | ❌ No REST API — too expensive for agents |
| **Kener** | REST (partial) | ❌ Fragile — monitor types poorly documented, crash-prone |
| **Checkmate** | Full REST + OpenAPI | ✅ Clean API, JWT auth, easy automation |

Checkmate won because it has a proper REST API with OpenAPI spec, JWT bearer auth, and comprehensive endpoints for monitors, notifications, incidents, and status pages.

## What it does

- **Create monitors** — HTTP, ping, pagespeed, hardware, Docker, port checks
- **Manage notifications** — email, Slack, Discord, Telegram, webhook integrations
- **Track incidents** — automatic incident detection and resolution
- **Status pages** — public status page management via API
- **Maintenance windows** — schedule planned downtime

## API overview

Authentication via JWT bearer token (replace `$BASE` with your Checkmate instance URL):

```bash
TOKEN=$(curl -s $BASE/auth/login \
  -X POST -H "Content-Type: application/json" \
  -d '{"email":"...","password":"..."}' | jq -r '.data.token')
```

### Key endpoints

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/monitors` | Create a monitor |
| `GET` | `/monitors/team` | List all monitors |
| `GET` | `/monitors/uptime/details/{id}` | Uptime details |
| `POST` | `/notifications` | Add notification channel |
| `POST` | `/status-page` | Create status page |
| `POST` | `/maintenance-window` | Schedule maintenance |

### Creating an HTTP monitor

```json
{
  "name": "My Service",
  "description": "Production API",
  "type": "http",
  "url": "https://api.example.com",
  "interval": 60
}
```

Interval range: 30–3600 seconds.

## Links

- [Checkmate GitHub](https://github.com/bluewave-labs/checkmate)
- [OpenAPI Spec](https://raw.githubusercontent.com/bluewave-labs/checkmate/develop/server/openapi.json)
- [Checkmate Website](https://checkmate.so)
