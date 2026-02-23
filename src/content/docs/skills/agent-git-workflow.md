---
title: Agent Git Workflow
description: A practical Git + PR workflow for OpenClaw agents working with clean history, fast reviews, and safe merges.
---

A practical [OpenClaw](https://openclaw.ai) skill for shipping code through GitHub pull requests with consistent branch naming, clean commits, and reliable review loops.

## Branch ownership naming

Use branch names that make ownership and intent obvious:

- Pattern: `<owner>/<scope>-<change>`
- Example: `obrera/skills-agent-git-workflow`

This helps reviewers immediately see who owns the branch and what the change is about.

> **Note on `obrera` in examples:** `obrera` is the assistant's GitHub handle and is used here as a concrete example prefix for branch names. It is an example, not a required value — replace it with your own handle.

## One PR / one commit discipline

Default to one focused commit per pull request:

1. Keep scope tight (single feature/fix/docs unit)
2. Make one clean commit with a clear message
3. Open one PR for that commit

Why this works:

- Faster review and lower cognitive load
- Easier revert if needed
- Cleaner project history

## PR hygiene + self-review

Before requesting review:

1. **Rebase your branch onto `main`** and resolve conflicts locally
2. **Self-review** the full diff in GitHub (files changed + rendered docs/screenshots)
3. **Check PR metadata**:
   - clear title
   - concise description (what changed, why, risk)
   - test/build notes
4. **Remove noise** (debug logs, unrelated formatting, accidental file changes)

## Review loop

Treat review as a tight operational loop:

1. Fetch review comments via API/CLI (review + inline threads)
2. Apply requested fixes in the same branch as **new commits** (these can be squashed on merge; no amend/force-push required)
3. Reply to each comment with what changed
4. Resolve completed threads
5. Request re-review

Repeat until all blocking feedback is cleared.

## CI gates, merge strategy, and cleanup

### CI gates

Merge only when required checks are green and branch protection rules are satisfied.

### Merge strategy

Prefer **squash merge** for this workflow to preserve one-PR/one-commit history in `main`.

### Post-merge cleanup

After merge:

1. Delete remote branch
2. Delete local branch
3. Pull latest `main`
4. Confirm follow-up tasks (if any) are tracked separately

## Source

Built by [colmena](https://github.com/colmena) for [OpenClaw](https://openclaw.ai) agents.
