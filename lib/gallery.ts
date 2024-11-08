'use server';

import { v2 as cloudinary } from 'cloudinary';
import lqip from 'lqip-modern';
import { getCldImageUrl } from 'next-cloudinary';
import { cache } from 'react';
import { galleryCollections, galleryDestinations } from './data';
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
				const { width, height, public_id, secure_url, metadata, tags } = resource;

				return {
					id: public_id,
					src: secure_url,
					blurData: await createBlurDataURL(public_id),
					width,
					height,
					metadata,
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
		console.error('Error fetching images:', error);
		throw new Error('Failed to fetch images');
	}
});

export async function getImagesByTag(tag: string) {
	try {
		const results = await cloudinary.api.resources_by_tag(tag, {
			tags: true,
			context: true,
		});

		if (!results || !Array.isArray(results.resources)) {
			throw new Error('Invalid response from Cloudinary');
		}

		return await mapGalleryImages(results.resources);
	} catch (error) {
		console.error('Error fetching images:', error);
		throw new Error('Failed to fetch images');
	}
}

export async function getImagesInCollection(type: 'destinations' | 'collections', name: string) {
	const { images } = await getAllImages();

	return images.filter((img) =>
		type === 'collections'
			? img.metadata.collections?.includes(name)
			: img.metadata.destinations?.includes(name)
	);
}

export async function getCoverImages(type: 'destinations' | 'collections') {
	const { images } = await getAllImages();
	const targetArray = type === 'destinations' ? galleryDestinations : galleryCollections;

	const collections = targetArray.map((item) => {
		// Find all matching images for this item
		const matchingImages = images.filter((img) => {
			const metadata =
				type === 'collections' ? img.metadata.collections : img.metadata.destinations;

			return metadata?.some((value) => value === item.title.toLowerCase());
		});

		return {
			title: item.title,
			description: item.description,
			cover: matchingImages.length > 0 ? matchingImages[0] : null,
		};
	});

	return collections as GalleryCollection[];
}
