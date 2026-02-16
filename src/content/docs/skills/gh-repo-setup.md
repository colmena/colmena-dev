---
title: gh-repo-setup
description: An OpenClaw skill for setting up and optimizing GitHub repositories with branch protection, metadata, and best-practice settings.
---

An [OpenClaw](https://openclaw.ai) agent skill for standardizing GitHub repository settings.

## Usage

This skill is triggered conversationally — tell your OpenClaw agent to set up a repo:

```
Set up repo settings and branch protection for colmena/my-new-repo
```

The agent reads the skill instructions, inspects the repo, and applies the settings via the GitHub API. No CLI command needed — it's a skill the agent follows, not a script you run.

## What it does

Guides an AI agent through repo setup and optimization:

1. **Metadata** — description, homepage URL, and topics for discoverability
2. **Repo settings** — auto-delete branches, squash merge, linear history
3. **Branch protection** — rulesets that apply to everyone, including admins

## Settings applied

### Metadata
- Description with emoji, under 100 chars
- Homepage URL pointing to deployed site
- Topics for framework, language, and domain

### Merge behavior
- **Squash merge** as primary (PR title → commit title)
- **Rebase merge** allowed as alternative
- **Merge commits** disabled — linear history
- **Auto-delete head branches** after merge

### Branch protection (via rulesets)
- No direct pushes to main — PRs required for everyone
- 1 approving review required
- Stale reviews dismissed on new pushes
- Unresolved review threads block merge
- No force push or branch deletion on main
- No bypass actors — rules apply to admins too

## Why rulesets over legacy branch protection?

GitHub rulesets are the newer API and apply universally — they can't be bypassed by admins, support more granular conditions, and stack with other rulesets.

## Source

Built by [colmena](https://github.com/colmena) for [OpenClaw](https://openclaw.ai) agents.
