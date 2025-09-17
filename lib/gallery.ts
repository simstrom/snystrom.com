'use server';

import {
	GALLERY_COLLECTIONS_TAG_PREFIX,
	GALLERY_COVER_TAG,
	GALLERY_FOLDER_PATH,
} from '@/data/constants';
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

export const getAllImages = cache(async (limit?: number, cursor?: string) => {
	try {
		const results = await cloudinary.api.resources({
			type: 'upload',
			resource_type: 'image',
			prefix: GALLERY_FOLDER_PATH,
			max_results: limit,
			next_cursor: cursor,
		});

		if (!results || !Array.isArray(results.resources)) {
			throw new Error('Invalid response from Cloudinary');
		}

		const images = await mapGalleryImages(results.resources);
		const { next_cursor } = results;

		return { images, next_cursor };
	} catch (error) {
		console.error('Error fetching all images:', error);
		throw new Error('Failed to fetch all images');
	}
});

export const getImagesInCollection = cache(
	async (name: string, limit?: number, cursor?: string) => {
		const tag = `${GALLERY_COLLECTIONS_TAG_PREFIX}${name.toLowerCase()}`;

		try {
			const results = await cloudinary.api.resources_by_tag(tag, {
				resource_type: 'image',
				max_results: limit,
				next_cursor: cursor,
			});

			if (!results || !Array.isArray(results.resources)) {
				throw new Error('Invalid response from Cloudinary');
			}

			const images = await mapGalleryImages(results.resources);
			const { next_cursor } = results;

			return { images, next_cursor };
		} catch (error) {
			console.error(`Error fetching ${name} images:`, error);
			throw new Error(`Failed to fetch ${name} images:`);
		}
	}
);

export const getCollections = cache(async (limit?: number, cursor?: string) => {
	try {
		const results = await cloudinary.api.resources_by_tag(GALLERY_COVER_TAG, {
			resource_type: 'image',
			tags: true,
			max_results: limit,
			next_cursor: cursor,
		});

		if (!results || !Array.isArray(results.resources)) {
			throw new Error('Invalid response from Cloudinary');
		}

		const images = await mapGalleryImages(results.resources);
		const { next_cursor } = results;

		const collections = galleryCollections.map((collection) => {
			const matchingImages = images.filter((img: any) =>
				img.tags?.includes(`${GALLERY_COLLECTIONS_TAG_PREFIX + slugify(collection.title)}`)
			);

			// Only log missing cover image if all collections have been fetched (no cursor for more)
			if (!matchingImages.length && !next_cursor) {
				console.warn(`Collection ${collection.title} is missing cover image in Cloudinary`);
				return;
			}

			return {
				...collection,
				cover: matchingImages[0],
			};
		});

		const filteredCollections = collections.filter(Boolean);
		return { collections: filteredCollections as GalleryCollection[], next_cursor };
	} catch (error) {
		console.error(`Error fetching collection cover images:`, error);
		throw new Error(`Failed to fetch collection cover images:`);
	}
});
