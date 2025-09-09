import { allPosts } from '@/.content-collections/generated';
import { SITE_URL } from '@/data/constants';
import { galleryCollections, galleryDestinations } from '@/data/data';
import { getAllTags } from '@/lib/blog';
import { slugify } from '@/lib/utils';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	const posts: MetadataRoute.Sitemap = allPosts.map((post) => ({
		url: `${SITE_URL}/blog/${post.slug}`,
		lastModified: post.date.toISOString().split('T')[0],
	}));

	const routes: MetadataRoute.Sitemap = [
		'',
		'/about',
		'/activity',
		'/blog',
		'/colophon',
		'/gallery',
		'/gallery/destinations',
		'/gallery/collections',
		'/projects',
		...getAllTags().map((tag) => `/blog/tag/${slugify(tag)}`),
		...galleryDestinations.map(
			(destination) => `/gallery/destinations/${slugify(destination.title)}`
		),
		...galleryCollections.map((collection) => `/gallery/collections/${slugify(collection.title)}`),
	].map((route) => ({
		url: `${SITE_URL}${route}`,
		lastModified: new Date().toISOString().split('T')[0],
	}));

	return [...routes, ...posts];
}
