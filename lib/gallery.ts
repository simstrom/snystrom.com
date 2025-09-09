'use server';

import { v2 as cloudinary } from 'cloudinary';
import lqip from 'lqip-modern';
import { getCldImageUrl } from 'next-cloudinary';
import { cache } from 'react';
import { galleryCollections, galleryDestinations } from '../data/data';
import { GalleryCollection, GalleryImage } from './types';

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
			prefix: 'snystrom/gallery',
			context: true,
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

// Used for other parts of site such as landing/about page.
export const getImagesByTag = cache(async (tag: string) => {
	try {
		const results = await cloudinary.api.resources_by_tag(tag, {
			resource_type: 'image',
			context: true,
			max_results: 50, // Default is 10 so we don't want to be limited
		});

		if (!results || !Array.isArray(results.resources)) {
			throw new Error('Invalid response from Cloudinary');
		}

		return await mapGalleryImages(results.resources);
	} catch (error) {
		console.error(`Error fetching ${tag} images:`, error);
		throw new Error(`Failed to fetch ${tag} images:`);
	}
});

export const getImagesInCollection = cache(
	async (type: 'destinations' | 'collections', name: string, limit?: number, cursor?: string) => {
		const tag = `${type}_${name}`;

		try {
			const results = await cloudinary.api.resources_by_tag(tag, {
				resource_type: 'image',
				context: true,
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

export const getCoverImages = cache(async (type: 'destinations' | 'collections') => {
	try {
		const results = await cloudinary.api.resources_by_tag('cover', {
			resource_type: 'image',
			tags: true,
			context: true,
			max_results: 50,
		});

		const images = await mapGalleryImages(results.resources);
		const targetArray = type === 'destinations' ? galleryDestinations : galleryCollections;

		const collections = targetArray.map((item) => {
			const matchingImages = images.filter((img: any) =>
				img.tags?.includes(`${type}_${item.title.toLowerCase()}`)
			);

			if (!matchingImages.length) console.error(`Collection ${item.title} is missing cover image`);

			return {
				...item,
				cover: matchingImages[0] ?? null,
			};
		});

		return collections as GalleryCollection[];
	} catch (error) {
		console.error(`Error fetching ${type} cover images:`, error);
		throw new Error(`Failed to fetch ${type} cover images:`);
	}
});
