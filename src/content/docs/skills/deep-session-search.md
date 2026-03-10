---
title: Deep Session Search
description: An OpenClaw skill for recovering prior context from session logs when memory is incomplete.
---

This skill helps recover decision context (domains, PRs, deploys, commands, and error trails) from historical OpenClaw sessions when those details were discussed but never promoted into long-term memory files.

## Why this exists

Sometimes important details are discussed in earlier sessions but never distilled into `MEMORY.md` or daily notes.

This skill gives the agent a reliable fallback path:

1. Try normal memory recall first.
2. If recall is missing/unclear, search session logs under `~/.openclaw/agents/main/sessions`.
3. Extract high-signal conversation/tool evidence without dumping noisy artifacts.

## What it does

- **Deep session grep** over `*.jsonl*` logs
- **Noise control** to avoid dependency/build blobs
- **Targeted narrowing** by exact domain, PR number, repo, deployment id, etc.
- **Evidence-first summaries** with path + relevant context

## Typical trigger

Use when the user asks things like:

- “What did we do with Cloudflare today?”
- “Check earlier sessions for that domain/config”
- “Find the command we used before”

…especially when memory search has low confidence.

## Search pattern

Prefer `ag` for fast uncompressed session log scans:

```bash
ag -n --nobreak --depth 1 -G '*.jsonl' "<search-term-1>|<search-term-2>" \
  ~/.openclaw/agents/main/sessions
```

For compressed/rotated logs, use one of these:

```bash
# ripgrep with compressed-file support
rg -n --search-zip --max-depth 1 "<search-term-1>|<search-term-2>" \
  ~/.openclaw/agents/main/sessions -g '*.jsonl*'

# or gzip-specific fallback
find ~/.openclaw/agents/main/sessions -maxdepth 1 -name '*.jsonl.gz' \
  -exec zgrep -HnE "<search-term-1>|<search-term-2>" {} +
```

Note: these examples use regex patterns. If your search terms are literals (like domains), either escape regex special characters or use fixed-string modes (for example: `ag -Q`, `rg -F`, `zgrep -F`).

Then narrow to exact needles for stronger evidence.

## Outcome format

The skill returns concise findings with:

- whether hits were found
- strongest 1–3 examples
- where they were found (path/context)
- confidence note if results are partial/noisy
