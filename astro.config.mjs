// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';

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
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
