---
title: create-seed
description: Scaffold a new project from a template. Fast, portable, zero config.
---

🌱 A scaffolding CLI that creates new projects from templates. Works with Bun, npm, and pnpm.

## Links

- **npm:** [`create-seed`](https://www.npmjs.com/package/create-seed)
- **Source:** [github.com/beeman/create-seed](https://github.com/beeman/create-seed)
- **Templates:** [github.com/beeman/templates](https://github.com/beeman/templates)

## Quick start

```bash
# With bun
bun x create-seed@latest my-app -t bun-library

# With npx
npx create-seed@latest my-app -t bun-library

# With pnpx
pnpx create-seed@latest my-app -t bun-library
```

## What it does

1. **Clones the template** — downloads from GitHub (via [giget](https://github.com/unjs/giget)) or copies from a local path
2. **Rewrites package.json** — updates the project name and cleans up template metadata
3. **Installs dependencies** — auto-detects your package manager based on how you ran it
4. **Initializes git** — `git init` + initial commit

## Templates

Browse the full list at [beeman/templates](https://github.com/beeman/templates). Current templates:

| Template | Description |
| --- | --- |
| `bun-library` | TypeScript library with Bun, tsup, Biome, Changesets |
| `bun-library-solana-kit` | Solana library with @solana/kit and Surfpool e2e tests |

You can also use any GitHub repo, subdirectory, branch, or local path as a template:

```bash
# Short name (from the default registry)
bun x create-seed@latest my-app -t bun-library

# GitHub repo
bun x create-seed@latest my-app -t gh:owner/repo

# GitHub subdirectory on a specific branch
bun x create-seed@latest my-app -t gh:owner/repo/path#my-branch

# Local path
bun x create-seed@latest my-app -t ./my-local-template
```

## Package manager detection

create-seed auto-detects which package manager you're using:

| Command | Detected PM |
| --- | --- |
| `bun x create-seed@latest` | bun |
| `npx create-seed@latest` | npm |
| `pnpx create-seed@latest` | pnpm |

Override with `--pm`:

```bash
bun x create-seed@latest my-app -t bun-library --pm bun
```

## Analytics

Anonymous usage statistics are collected via [Umami](https://umami.is) to help improve the tool. No personally identifiable information is collected. Opt out with `DO_NOT_TRACK=1`. Analytics are automatically disabled in CI.
