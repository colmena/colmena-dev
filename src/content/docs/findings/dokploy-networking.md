---
title: Dokploy networking gotchas
description: Common pitfalls when deploying multi-service Docker Compose apps with Dokploy and Traefik.
---

[Dokploy](https://dokploy.com) uses Traefik as a reverse proxy and puts all services on the `dokploy-network` overlay network. This works great for single-service apps, but multi-service compose setups have some non-obvious gotchas.

## Services can't talk to each other

**Problem:** Your API service can't reach your database (e.g. `http://libsql:8080` gets `ConnectionRefused`).

**Why:** Dokploy puts services on `dokploy-network` for Traefik routing, but inter-service communication uses the compose `default` network. If a service only has `dokploy-network`, it can't see other compose services.

**Fix:** Explicitly add both networks to services that need Traefik routing AND inter-service access:

```yaml
services:
  api:
    image: my-api:latest
    networks:
      - dokploy-network  # Traefik routing
      - default           # inter-service (e.g. database)
  db:
    image: my-db:latest
    networks:
      - default           # no Traefik needed

networks:
  dokploy-network:
    external: true
```

## Domain port must match container port

**Problem:** Your app runs on port 3000 inside the container, but you mapped `8080:3000` in the compose file and set port 8080 in the Dokploy domain config. It doesn't work.

**Why:** Traefik routes directly to the container on `dokploy-network` — it bypasses Docker's port mapping entirely. The domain port must match the **container-internal** port, not the host-mapped port.

**Fix:** Set the Dokploy domain port to the port your app listens on inside the container (e.g. 3000, not 8080).

## Port 3000 conflicts

**Problem:** Your app won't start because port 3000 is already in use.

**Why:** Several tools bind to host port 3000 by default (including OpenClaw). If your compose file maps a host port, it may conflict.

**Fix:** Use environment variables to control the host port mapping, or skip host port mapping entirely — Traefik routes via the overlay network, so you only need host ports for direct debugging access.

```yaml
services:
  api:
    image: my-api:latest
    ports:
      - "${HOST_PORT:-3001}:3000"  # avoid 3000 on host
```

## Redeployment required after domain changes

**Problem:** You updated a domain's port in Dokploy but traffic still goes to the old port.

**Why:** Traefik reads routing labels at deployment time. Changing the domain config in the Dokploy UI doesn't update the running container's labels.

**Fix:** Redeploy after changing domain settings.

## Healthchecks in minimal images

**Problem:** Your healthcheck fails because the container image doesn't have `curl`, `wget`, or even `bash`.

**Why:** Distroless and minimal images strip out shell utilities for security and size.

**Fix:** Use a retry loop in an entrypoint script instead of HTTP healthchecks, or use the application's own health endpoint with Docker's built-in health check mechanism:

```yaml
healthcheck:
  test: ["CMD", "node", "-e", "fetch('http://localhost:3000/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"]
  interval: 10s
  retries: 3
```
