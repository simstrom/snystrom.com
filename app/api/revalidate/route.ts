import { GALLERY_COLLECTIONS_TAG_PREFIX } from '@/data/constants';
import { galleryCollections } from '@/data/data';
import { slugify } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

enum NotificationType {
	tags = 'resource_tags_changed',
	delete = 'delete',
}

function mapPaths(resources: any[], type: NotificationType): string[] {
	const paths: string[] = [];
	paths.push('/gallery');

	for (const resource of resources) {
		const match = galleryCollections.find((c) => {
			if (type === NotificationType.tags) {
				return resource.added.includes(`${GALLERY_COLLECTIONS_TAG_PREFIX}${slugify(c.title)}`);
			} else if (type === NotificationType.delete) {
				return resource.tags.includes(`${GALLERY_COLLECTIONS_TAG_PREFIX}${slugify(c.title)}`);
			}

			return false;
		});

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
		const resources = body.resources || [];

		const pathsToRevalidate = mapPaths(resources, body.notification_type as NotificationType);

		console.log('Revalidating paths:', pathsToRevalidate);

		await Promise.all(pathsToRevalidate.map((path) => revalidatePath(path, 'page')));

		return NextResponse.json({ revalidated: true, paths: pathsToRevalidate });
	} catch (err) {
		console.error(err);
		return NextResponse.json({ error: 'Error revalidating', status: 500 });
	}
}
