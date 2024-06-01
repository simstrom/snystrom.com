'use server';

import cloudinary from 'cloudinary';
import { getCldImageUrl } from 'next-cloudinary';
import { cache } from 'react';
import { galleryCollections, galleryDestinations } from './data';
import { GalleryCollection, GalleryImage } from './types';

async function createBlurDataURL(publicId: string) {
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

const mapGalleryImages = cache(async (result: any) => {
	const images = await Promise.all(
		result.map(async (resource: any) => {
			const { width, height } = resource;
			return {
				id: resource.public_id,
				src: resource.secure_url,
				blurData: await createBlurDataURL(resource.public_id),
				width,
				height,
			};
		})
	);
	return images as Array<GalleryImage>;
});

export async function getAllImages(limit?: number) {
	const results = await cloudinary.v2.api.resources({ resource_type: 'image', max_results: limit });
	const { resources } = results;
	return await mapGalleryImages(resources);
}

export async function getImagesInCollection(title: string) {
	const results = await cloudinary.v2.api.resources_by_tag(title);
	const { resources } = results;
	return await mapGalleryImages(resources);
}

export async function getCoverImages(type: string) {
	const results = await cloudinary.v2.api.resources_by_tag('Cover', {
		tags: true,
		context: true,
	});
	const { resources } = results;
	const targetArray = type === 'destinations' ? galleryDestinations : galleryCollections;

	const collections = await Promise.all(
		targetArray.map(async (item) => {
			const resource: any = resources.find(
				(resource) => resource.tags.includes(item.title) && resource.metadata.coverfor == type
			);
			if (resource) {
				const cover = {
					id: resource.public_id,
					src: resource.secure_url,
					blurData: await createBlurDataURL(resource.public_id),
					width: resource.width,
					height: resource.height,
				};
				return {
					title: item.title,
					description: item.description,
					cover,
				};
			}
		})
	);

	return collections.filter(Boolean) as Array<GalleryCollection>;
}
