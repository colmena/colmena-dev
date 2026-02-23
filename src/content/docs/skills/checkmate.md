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
  "interval": 60000
}
```

Interval range: 30000–3600000 milliseconds.

## Operational gotcha: monitor interval units

**Critical:** in Checkmate runtime/DB documents, monitor `interval` is effectively treated as **milliseconds**.

- ✅ Minute cadence in DB/runtime: `60000`
- ❌ Bad value: `60` (seconds-like) can behave like near-1-second checks

When many monitors have very low `interval` values, the scheduler can hammer CPU, network, and MongoDB with excessive check churn.

### How to detect quickly

1. **Check container pressure**
   ```bash
   docker stats --no-stream checkmate-server checkmate-mongo
   ```
2. **Inspect interval distribution** (look for unusually low values)
   ```javascript
   db.monitors.aggregate([
     { $group: { _id: "$interval", count: { $sum: 1 } } },
     { $sort: { _id: 1 } }
   ])
   ```
3. **Validate recent check cadence**
   - Sample recent checks/incidents and confirm they are roughly minute-spaced for normal monitors.
   - If many entries are seconds apart, intervals are likely mis-scaled.

### Safe remediation playbook

1. **Backup monitor documents first**
   ```bash
   mongodump --db checkmate --collection monitors --archive=./monitors-backup-$(date +%F-%H%M%S).gz --gzip
   ```
2. **Normalize low intervals to 60000 ms**
   ```javascript
   db.monitors.updateMany(
     { interval: { $lt: 1000 } },
     { $set: { interval: 60000 } }
   )
   ```
3. **Restart Checkmate server** so scheduler state is refreshed.
4. **Verify post-fix cadence**
   - Monitor updates should return to ~1-minute intervals.
   - `docker stats` should show reduced sustained load.

### Optional hardening

- Add retention/TTL policies for historical checks to cap collection growth.
- Set CPU/memory limits on Checkmate and Mongo containers.
- Reduce frequency for expensive monitor types (especially `pagespeed`).

## Links

- [Checkmate GitHub](https://github.com/bluewave-labs/checkmate)
- [OpenAPI Spec](https://raw.githubusercontent.com/bluewave-labs/checkmate/develop/server/openapi.json)
- [Checkmate Website](https://checkmate.so)
