import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Simon Nyström | Web Developer and Photographer',
		short_name: 'Simon Nyström',
		description: 'Frontend engineer with a passion for UI/UX design and photography.',
		start_url: '/',
		display: 'standalone',
		background_color: '#0f1115',
		theme_color: '#f0f0ea',
		icons: [
			{
				src: '/favicon.ico',
				sizes: 'any',
				type: 'image/x-icon',
			},
		],
		categories: ['development', 'technology', 'web development', 'programming', 'frontend'],
		orientation: 'portrait',
		prefer_related_applications: false,
		shortcuts: [
			{
				name: 'Latest Posts',
				url: '/blog',
				description: 'Read latest frontend engineering articles',
			},
			{
				name: 'Projects',
				url: '/projects',
				description: 'View technical projects and experiments',
			},
			{
				name: 'Gallery',
				url: '/gallery',
				description: 'Photography portfolio',
			},
		],
		id: '/',
		scope: '/',
		lang: 'en',
		dir: 'ltr',
	};
}
