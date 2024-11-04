import { getAllTags, getBlogPosts } from '@/lib/blog';
import { galleryCollections, galleryDestinations } from '@/lib/data';
import { slugify } from '@/lib/utils';
import type { MetadataRoute } from 'next';

// Create dynamic routes with type-specific priorities and frequencies
function getDynamicRoutes(): MetadataRoute.Sitemap {
	// Blog
	const posts = getBlogPosts().map((post) => ({
		url: `blog/${post.slug}`,
		lastModified: post.date,
		changeFrequency: 'monthly',
		priority: 0.7,
	}));
	const tags = getAllTags().map((tag) => ({
		url: `blog/tag/${slugify(tag)}`,
		lastModified: new Date(),
		changeFrequency: 'monthly',
		priority: 0.5,
	}));

	// Gallery
	const destinations = galleryDestinations.map((destination) => ({
		url: `gallery/destinations/${slugify(destination.title)}`,
		lastModified: new Date(),
		changeFrequency: 'monthly',
		priority: 0.6,
	}));
	const collections = galleryCollections.map((collection) => ({
		url: `gallery/collections/${slugify(collection.title)}`,
		lastModified: new Date(),
		changeFrequency: 'monthly',
		priority: 0.6,
	}));

	return [...posts, ...tags, ...destinations, ...collections] as MetadataRoute.Sitemap;
}

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://snystrom.com';

	const staticRoutes: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1,
		},
		{
			url: `${baseUrl}/about`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/activity`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.5,
		},
		{
			url: `${baseUrl}/blog`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.9,
		},
		{
			url: `${baseUrl}/colophon`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.5,
		},
		{
			url: `${baseUrl}/gallery`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/gallery/destinations`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.6,
		},
		{
			url: `${baseUrl}/gallery/collections`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.6,
		},
		{
			url: `${baseUrl}/projects`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
	];

	const dynamicRoutes = getDynamicRoutes();

	return [...staticRoutes, ...dynamicRoutes];
}
