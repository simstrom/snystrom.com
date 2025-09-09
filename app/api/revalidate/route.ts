import { galleryCollections, galleryDestinations } from '@/lib/data';
import { slugify } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

function getGallerySlugs() {
	const destinationSlugs = galleryDestinations.map(
		(destination) => `/gallery/destinations/${slugify(destination.title)}`
	);
	const collectionSlugs = galleryCollections.map(
		(collection) => `/gallery/collections/${slugify(collection.title)}`
	);
	return [...destinationSlugs, ...collectionSlugs];
}

export async function POST(req: NextRequest) {
	// Check for secret to confirm this is a valid request
	if ((req.nextUrl.searchParams.get('secret') as string) !== process.env.REVALIDATION_SECRET) {
		return NextResponse.json({ error: 'Invalid token', status: 401 });
	}

	try {
		const pathsToRevalidate = [
			'/gallery',
			'/gallery/destinations',
			'/gallery/collections',
			...getGallerySlugs(),
		];

		await Promise.all(pathsToRevalidate.map((path) => revalidatePath(path)));
		return NextResponse.json({ revalidated: true });
	} catch (err) {
		return NextResponse.json({ error: 'Error revalidating', status: 500 });
	}
}
