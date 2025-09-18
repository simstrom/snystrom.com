'use server';

import { GALLERY_COLLECTIONS_TAG_PREFIX, GALLERY_COVER_TAG } from '@/data/constants';
import { v2 as cloudinary } from 'cloudinary';
import lqip from 'lqip-modern';
import { getCldImageUrl } from 'next-cloudinary';
import { cache } from 'react';
import { galleryCollections } from '../data/data';
import { GalleryCollection, GalleryImage } from './types';
import { slugify } from './utils';

async function createBlurDataURL(src: string): Promise<string> {
	const imageUrl = getCldImageUrl({
		src,
		width: 100,
	});
	const response = await fetch(imageUrl);
	const buffer = Buffer.from(await response.arrayBuffer());
	const result = await lqip(buffer);
	return result.metadata.dataURIBase64;
}

const mapGalleryImages = cache(async (result: Array<Object>): Promise<GalleryImage[]> => {
	try {
		const images = await Promise.all(
			result.map(async (resource: any): Promise<GalleryImage> => {
				const { width, height, public_id, secure_url, tags, context } = resource;

				return {
					id: public_id,
					src: secure_url,
					alt: context?.custom.alt,
					blurData: await createBlurDataURL(public_id),
					width,
					height,
					tags,
				};
			})
		);
		return images;
	} catch (error) {
		console.error('Error mapping gallery images:', error);
		throw new Error('Failed to process images');
	}
});

let cachedResults: GalleryImage[] | null = null;
export const getAllImages = cache(async () => {
	if (cachedResults) {
		return cachedResults;
	}

	try {
		const results = await cloudinary.api.resources({
			type: 'upload',
			resource_type: 'image',
			max_results: 500,
			tags: true,
		});

		if (!results || !Array.isArray(results.resources)) {
			throw new Error('Invalid response from Cloudinary');
		}

		cachedResults = await mapGalleryImages(results.resources);

		return cachedResults;
	} catch (error) {
		console.error('Error fetching images:', error);
		throw new Error('Failed to fetch images');
	}
});

export const getLimitedImages = cache(async (limit: number) => {
	const resources = await getAllImages();
	return resources.slice(0, limit);
});

export const getImagesInCollection = cache(async (name: string) => {
	const tag = `${GALLERY_COLLECTIONS_TAG_PREFIX}${name.toLowerCase()}`;
	try {
		const resources = await getAllImages();
		return resources.filter((img) => img.tags.includes(tag));
	} catch (error) {
		console.error(`Error fetching ${name} images:`, error);
	}
});

export const getCollections = cache(async () => {
	try {
		const resources = await getAllImages();
		const images = resources.filter((img) => img.tags?.includes(GALLERY_COVER_TAG));

		const collections = galleryCollections.map((collection) => {
			const matchingImages = images.filter((img: any) =>
				img.tags?.includes(`${GALLERY_COLLECTIONS_TAG_PREFIX + slugify(collection.title)}`)
			);

			if (!matchingImages.length) {
				console.warn(`Collection ${collection.title} is missing cover image in Cloudinary`);
				return;
			}

			return {
				...collection,
				cover: matchingImages[0],
			};
		});

		const filteredCollections = collections.filter(Boolean);
		return filteredCollections as GalleryCollection[];
	} catch (error) {
		console.error(`Error fetching collection cover images:`, error);
	}
});
