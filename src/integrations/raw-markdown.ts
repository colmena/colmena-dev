import { cpSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import type { AstroIntegration } from 'astro';

interface RawMarkdownOptions {
  /** Source directory relative to project root. Defaults to 'src/content/docs'. */
  src?: string;
  /** Output subdirectory inside dist. Defaults to 'raw'. */
  out?: string;
}

/**
 * Astro integration that copies raw .md/.mdx files from the content docs
 * directory to dist/raw/ at build time. This makes the original markdown
 * available at /raw/<path>.md for tools that want to fetch it directly.
 */
export function rawMarkdown(options?: RawMarkdownOptions): AstroIntegration {
  return {
    name: 'raw-markdown',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const docsDir = join(process.cwd(), options?.src ?? 'src/content/docs');
        const outDir = join(dir.pathname, options?.out ?? 'raw');

        if (!existsSync(docsDir)) {
          logger.warn('No docs directory found, skipping raw markdown copy');
          return;
        }

        mkdirSync(outDir, { recursive: true });

        let count = 0;
        const copyRecursive = (src: string) => {
          for (const entry of readdirSync(src)) {
            const fullPath = join(src, entry);
            const stat = statSync(fullPath);

            if (stat.isDirectory()) {
              copyRecursive(fullPath);
            } else if (entry.endsWith('.md') || entry.endsWith('.mdx')) {
              const rel = relative(docsDir, fullPath);
              const dest = join(outDir, rel);
              mkdirSync(dirname(dest), { recursive: true });
              cpSync(fullPath, dest);
              count++;
            }
          }
        };

        copyRecursive(docsDir);
        logger.info(`Copied ${count} markdown files to /${options?.out ?? 'raw'}/`);
      },
    },
  };
}
