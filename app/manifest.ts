import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME, SITE_TITLE } from '@/data/constants';
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: SITE_TITLE,
		short_name: SITE_NAME,
		description: SITE_DESCRIPTION,
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
		categories: SITE_KEYWORDS,
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
