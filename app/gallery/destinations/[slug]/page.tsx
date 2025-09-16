import PageHeader from '@/components/layouts/PageHeader';
import { Section } from '@/components/layouts/Section';
import GalleryView from '@/components/sections/GalleryView';

import { SITE_NAME, SITE_URL } from '@/data/constants';
import { galleryDestinations } from '@/data/data';
import { getImagesByTag, getImagesInCollection } from '@/lib/gallery';
import { slugify } from '@/lib/utils';

import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { ImageGallery, WithContext } from 'schema-dts';

interface Props {
	params: Promise<{
		slug: string;
	}>;
}

export async function generateMetadata(props: Props): Promise<Metadata | undefined> {
	const params = await props.params;
	const collection = galleryDestinations.find((item) => slugify(item.title) === params.slug);
	if (!collection) return notFound();

	const { title, description } = collection;
	const coverImage = (await getImagesByTag(`destinations_${collection.title}`)).slice(0, 1);

	return {
		title: `${title} - Photo Gallery`,
		description,
		openGraph: {
			title: `${title} - Photo Gallery`,
			description,
			url: `${SITE_URL}/gallery/destinations/${slugify(collection.title)}`,
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

export default async function GalleryDestination(props: Props) {
	const params = await props.params;
	const index = galleryDestinations.findIndex((item) => slugify(item.title) === params.slug);
	if (index === -1) return notFound();

	const collection = galleryDestinations[index];
	const { images, next_cursor } = await getImagesInCollection('destinations', params.slug, 24);

	const previousIndex = (index - 1 + galleryDestinations.length) % galleryDestinations.length;
	const nextIndex = (index + 1) % galleryDestinations.length;
	const previousCollection = galleryDestinations[previousIndex];
	const nextCollection = galleryDestinations[nextIndex];

	const backLink = {
		path: '/gallery/destinations',
		name: 'Destinations',
	};

	const jsonLd: WithContext<ImageGallery> = {
		'@type': 'ImageGallery',
		'@context': 'https://schema.org',
		name: `${SITE_NAME} Photography - ${collection.title}`,
		description: collection.description,
		url: `${SITE_URL}/gallery/destinations/${slugify(collection.title)}`,
		image: images.slice(0, 3).map((img) => img.src),
	};

	return (
		<main className="grow">
			<Script
				type="application/ld+json"
				id={`gallery-${slugify(collection.title)}_jsonLd`}
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>

			<PageHeader
				title={collection.title}
				subtitle="Destination"
				content={collection.description}
			/>

			<Section borderOrigin={'t'} className="pb-10">
				<GalleryView content={images} cursor={next_cursor} backLink={backLink} />
			</Section>

			<div className="pb-20 w-full flex justify-between items-center text-sm font-medium select-none">
				<Link
					href={`${backLink.path}/${slugify(previousCollection.title)}`}
					className="flex-1 mx-4 px-6 py-4 rounded-lg text-foreground/80 transition-colors hover:bg-foreground-tertiary/5 hover:text-foreground"
				>
					<span className="block text-xs text-foreground-tertiary">Prev</span>
					{previousCollection.title}
				</Link>

				<Link
					href={backLink.path}
					className="text-center flex-1 mx-4 px-6 py-4 rounded-lg text-foreground/80 transition-colors hover:bg-foreground-tertiary/5 hover:text-foreground"
				>
					<span className="block text-xs text-foreground-tertiary">Destinations</span>
					Index
				</Link>

				<Link
					href={`${backLink.path}/${slugify(nextCollection.title)}`}
					className="text-right flex-1 mx-4 px-6 py-4 rounded-lg text-foreground/80 transition-colors hover:bg-foreground-tertiary/5 hover:text-foreground"
				>
					<span className="block text-xs text-foreground-tertiary">Next</span>
					{nextCollection.title}
				</Link>
			</div>
		</main>
	);
}

export async function generateStaticParams() {
	return galleryDestinations.map((item) => ({ slug: slugify(item.title) }));
}
