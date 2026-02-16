// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import { rawMarkdown } from './src/integrations/raw-markdown';

// https://astro.build/config
export default defineConfig({
	site: 'https://colmena.dev',
	integrations: [
		starlight({
			title: 'colmena',
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
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
