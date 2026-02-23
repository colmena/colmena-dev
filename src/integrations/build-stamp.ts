import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { AstroIntegration } from 'astro';

export function buildStamp(options: { sha: string; repo: string }): AstroIntegration {
  return {
    name: 'build-stamp',
    hooks: {
      'astro:build:done': ({ dir }) => {
        const { sha, repo } = options;
        writeFileSync(
          join(dir.pathname, 'version.json'),
          JSON.stringify({
            sha,
            url: sha !== 'dev' ? `https://github.com/${repo}/commit/${sha}` : null,
            built: process.env.BUILD_TIMESTAMP || new Date().toISOString(),
          }),
        );
      },
    },
  };
}
