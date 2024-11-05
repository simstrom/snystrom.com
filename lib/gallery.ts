'use server';

import { v2 as cloudinary } from 'cloudinary';
import { getPlaiceholder } from 'plaiceholder';
import { cache } from 'react';
import { galleryCollections, galleryDestinations } from './data';
import { GalleryCollection, GalleryImage } from './types';

async function createBlurDataURL(src: string): Promise<string> {
	const buffer = await fetch(src).then(async (res) => {
		return Buffer.from(await res.arrayBuffer());
	});
	const { base64 } = await getPlaiceholder(buffer);

	return base64;
}

const mapGalleryImages = cache(async (result: any): Promise<GalleryImage[]> => {
	try {
		const images = await Promise.all(
			result.map(async (resource: any): Promise<GalleryImage> => {
				const { width, height, public_id, secure_url, metadata, tags } = resource;

				return {
					id: public_id,
					src: secure_url,
					blurData: await createBlurDataURL(secure_url),
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
	try {
		const results = await cloudinary.search
			.expression('folder:snystrom/gallery')
			.with_field('tags')
			.with_field('context')
			.max_results(limit)
			.execute();

		if (!results || !Array.isArray(results.resources)) {
			throw new Error('Invalid response from Cloudinary');
		}

		return await mapGalleryImages(results.resources);
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
