import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';

	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
				disallow: '/api/',
				crawlDelay: 10,
			},
		],
		sitemap: `${baseUrl}/sitemap.xml`,
		host: baseUrl,
	};
}
