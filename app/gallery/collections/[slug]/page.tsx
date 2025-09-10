import PageHeader from '@/components/layouts/PageHeader';
import { Section } from '@/components/layouts/Section';
import GalleryView from '@/components/sections/GalleryView';
import Button from '@/components/ui/Button';

import { SITE_URL } from '@/data/constants';
import { galleryCollections } from '@/data/data';
import { getImagesByTag, getImagesInCollection } from '@/lib/gallery';
import { slugify } from '@/lib/utils';

import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
	params: Promise<{
		slug: string;
	}>;
}

export async function generateMetadata(props: Props): Promise<Metadata | undefined> {
	const params = await props.params;
	const collection = galleryCollections.find((item) => slugify(item.title) === params.slug);
	if (!collection) return notFound();

	const { title, description } = collection;
	const coverImage = (await getImagesByTag(`collections_${collection.title}`)).slice(0, 1);

	return {
		title: `${title} - Photo Gallery`,
		description,
		openGraph: {
			title: `${title} - Photo Gallery`,
			description,
			url: `${SITE_URL}/gallery/collections/${slugify(collection.title)}`,
			images: [
				{
					url: `/api/ogGallery?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(
						'Photo Gallery'
					)}&image=${encodeURIComponent(coverImage[0].src)}`,
					width: 1200,
					height: 630,
					alt: `${title} Photo Gallery cover image`,
					type: 'image/png',
				},
			],
		},
		twitter: {
			title: `${title} - Photo Gallery`,
			description,
			images: [
				{
					url: `/api/ogGallery?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(
						'Photo Gallery'
					)}&image=${encodeURIComponent(coverImage[0].src)}`,
					width: 1200,
					height: 630,
					alt: `${title} Photo Gallery cover image`,
				},
			],
			card: 'summary_large_image',
		},
	};
}

export default async function GalleryCollection(props: Props) {
	const params = await props.params;
	const index = galleryCollections.findIndex((item) => slugify(item.title) === params.slug);
	if (index === -1) return notFound();

	const collection = galleryCollections[index];
	const { images, next_cursor } = await getImagesInCollection('collections', params.slug, 24);

	const previousIndex = (index - 1 + galleryCollections.length) % galleryCollections.length;
	const nextIndex = (index + 1) % galleryCollections.length;
	const previousCollection = galleryCollections[previousIndex];
	const nextCollection = galleryCollections[nextIndex];

	const backLink = {
		path: '/gallery/collections',
		name: 'Collections',
	};

	return (
		<main className="grow">
			<div className="relative max-w-5xl mx-auto">
				<span className="absolute top-28 px-6 ml-1 -translate-y-1 text-sm font-medium text-brand">
					Collection
				</span>
				<PageHeader
					title={collection.title}
					content={collection.description}
					className="pt-32 pb-12 bg-background-secondary"
				/>
			</div>

			<Section borderOrigin={'t'} className="pb-10">
				<GalleryView content={images} cursor={next_cursor} backLink={backLink} />
			</Section>

			<div className="pb-20 divide-x w-full flex justify-between items-center text-sm font-medium select-none">
				<Button
					variant="link"
					backLink
					href={`${backLink.path}/${slugify(previousCollection.title)}`}
					className="flex-1 px-6 py-4 border-y text-foreground transition-colors hover:bg-foreground hover:text-background"
				>
					{previousCollection.title}
				</Button>

				<Link
					href={backLink.path}
					className="text-center flex-1 px-6 py-4 border-y text-foreground transition-colors hover:bg-foreground hover:text-background"
				>
					Index
				</Link>

				<Button
					variant="link"
					href={`${backLink.path}/${slugify(nextCollection.title)}`}
					className="flex-1 px-6 py-4 border-y text-foreground transition-colors hover:bg-foreground hover:text-background"
				>
					{nextCollection.title}
				</Button>
			</div>
		</main>
	);
}

export async function generateStaticParams() {
	return galleryCollections.map((item) => ({ slug: slugify(item.title) }));
}
