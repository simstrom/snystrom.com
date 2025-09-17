import { GALLERY_COLLECTIONS_TAG_PREFIX } from '@/data/constants';
import { galleryCollections } from '@/data/data';
import { slugify } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

function mapTagsToPaths(tags: string[]): string[] {
	const paths: string[] = [];
	paths.push('/gallery');

	for (const tag of tags) {
		const match = galleryCollections.find(
			(c) => GALLERY_COLLECTIONS_TAG_PREFIX + slugify(c.title) === tag
		);

		if (match) {
			paths.push(`/gallery/${slugify(match.title)}`);
		}
	}

	return paths;
}

export async function POST(req: NextRequest) {
	// Check for secret to confirm this is a valid request
	if ((req.nextUrl.searchParams.get('secret') as string) !== process.env.REVALIDATION_SECRET) {
		return NextResponse.json({ error: 'Invalid token', status: 401 });
	}

	try {
		const body = await req.json();
		const tags: string[] = body.tags || [];

		const pathsToRevalidate = mapTagsToPaths(tags);

		await Promise.all(pathsToRevalidate.map((path) => revalidatePath(path, 'page')));

		return NextResponse.json({ revalidated: true, paths: pathsToRevalidate });
	} catch (err) {
		console.error(err);
		return NextResponse.json({ error: 'Error revalidating', status: 500 });
	}
}
