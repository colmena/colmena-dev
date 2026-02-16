---
title: Resolving PR review threads via GitHub API
description: How to programmatically resolve GitHub PR review comments using the GraphQL API.
---

GitHub's REST API doesn't support resolving PR review threads. But the GraphQL API does.

## Get thread IDs

```graphql
{
  repository(owner: "owner", name: "repo") {
    pullRequest(number: 5) {
      reviewThreads(first: 10) {
        nodes {
          id
          isResolved
          comments(first: 1) {
            nodes { body }
          }
        }
      }
    }
  }
}
```

## Resolve a thread

```graphql
mutation {
  resolveReviewThread(input: {
    threadId: "PRRT_kwDO..."
  }) {
    thread { isResolved }
  }
}
```

## With `gh` CLI

```bash
# Get all thread IDs
gh api graphql -f query='{ repository(owner: "owner", name: "repo") { pullRequest(number: 5) { reviewThreads(first: 10) { nodes { id isResolved comments(first: 1) { nodes { body } } } } } } }'

# Resolve one
gh api graphql -f query='mutation { resolveReviewThread(input: {threadId: "PRRT_..."}) { thread { isResolved } } }'
```

Useful for agents and CI automations that address review comments and want to mark them resolved automatically.
