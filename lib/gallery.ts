'use server';

import { v2 as cloudinary } from 'cloudinary';
import { getCldImageUrl } from 'next-cloudinary';
import { cache } from 'react';
import { galleryCollections, galleryDestinations } from './data';
import { GalleryCollection, GalleryImage } from './types';

let cachedImages: GalleryImage[] | null = null; // Singleton cache

async function createBlurDataURL(publicId: string): Promise<string> {
	const imageUrl = getCldImageUrl({
		src: publicId,
		width: 100,
	});
	const response = await fetch(imageUrl);
	const arrayBuffer = await response.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);
	const base64 = buffer.toString('base64');
	const dataUrl = `data:${response.type};base64,${base64}`;
	return dataUrl;
}

const mapGalleryImages = cache(async (result: any): Promise<GalleryImage[]> => {
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

export const getAllImages = cache(async (limit?: number) => {
	if (cachedImages) return cachedImages;

	try {
		const searchParams = cloudinary.search
			.expression('folder:snystrom/*')
			.with_field(['metadata', 'tags'])
			.sort_by('uploaded_at', 'desc');

		if (limit) {
			searchParams.max_results(limit);
		}

		const results = await searchParams.execute();

		if (!results || !Array.isArray(results.resources)) {
			throw new Error('Invalid response from Cloudinary');
		}

		cachedImages = results.resources; // Cache results in memory
		return await mapGalleryImages(results.resources);
	} catch (error) {
		console.error('Error fetching images:', error);
		throw new Error('Failed to fetch images');
	}
});

export async function getImagesByTag(tag: string) {
	const images = await getAllImages();
	return images.filter((img) => img.tags.includes(tag));
}

export async function getImagesInCollection(type: 'destinations' | 'collections', name: string) {
	const images = await getAllImages();

	return images.filter((img) =>
		type === 'collections'
			? img.metadata.collections?.includes(name)
			: img.metadata.destinations?.includes(name)
	);
}

export async function getCoverImages(type: 'destinations' | 'collections') {
	const images = await getAllImages();
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
