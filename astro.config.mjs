// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import umami from '@yeskunall/astro-umami';
import { buildStamp } from './src/integrations/build-stamp';
import { rawMarkdown } from './src/integrations/raw-markdown';

const commitSha = process.env.COMMIT_SHA || 'dev';

// https://astro.build/config
export default defineConfig({
	site: 'https://colmena.dev',
	integrations: [
		starlight({
			title: 'colmena',
			head: [
				{ tag: 'meta', attrs: { name: 'x-commit', content: commitSha } },
			],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/colmena' },
			],
			sidebar: [
				{
					label: 'About',
					items: [
						{ label: 'Welcome', slug: '' },
						{ label: 'About us', slug: 'about' },
					],
				},
				{
					label: 'Projects',
					autogenerate: { directory: 'projects' },
				},
				{
					label: 'Skills',
					autogenerate: { directory: 'skills' },
				},
				{
					label: 'Findings',
					autogenerate: { directory: 'findings' },
				},
			],
			customCss: ['./src/styles/global.css'],
		}),
		rawMarkdown(),
		buildStamp({ sha: commitSha, repo: 'colmena/colmena-dev' }),
		umami({
			id: '3d447655-7d7a-4ba8-806e-74eb1831f7b8',
			endpointUrl: 'https://stats.colmena.dev',
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
