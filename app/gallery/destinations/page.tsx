import PageHeader from '@/components/layouts/PageHeader';
import { Section } from '@/components/layouts/Section';
import GalleryView from '@/components/sections/GalleryView';
import { SITE_NAME, SITE_URL } from '@/data/constants';
import { getCoverImages } from '@/lib/gallery';
import { slugify } from '@/lib/utils';
import { Metadata } from 'next';
import Script from 'next/script';
import { CollectionPage, WithContext } from 'schema-dts';

const title = 'Destinations - Photo Gallery';
const description = "Moments, places, and details I've noticed along the way.";

export async function generateMetadata(): Promise<Metadata> {
	const collections = (await getCoverImages('destinations')).filter(
		(collection) => collection.cover != null
	);

	const ogImage = collections.length > 0 && collections[0].cover.src;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			images: [
				{
					url: `/api/ogGallery?title=${encodeURIComponent(
						'Destinations'
					)}&subtitle=${encodeURIComponent('Photo Gallery')}&image=${encodeURIComponent(ogImage)}`,
					width: 1200,
					height: 630,
					alt: `Photo Gallery cover image`,
					type: 'image/png',
				},
			],
		},
		twitter: {
			title,
			description,
			images: [
				{
					url: `/api/ogGallery?title=${encodeURIComponent(
						'Destinations'
					)}&subtitle=${encodeURIComponent('Photo Gallery')}&image=${encodeURIComponent(ogImage)}`,
					width: 1200,
					height: 630,
					alt: `Photo Gallery cover image`,
				},
			],
			card: 'summary_large_image',
		},
	};
}

export default async function Destinations() {
	const collections = (await getCoverImages('destinations')).filter(
		(collection) => collection.cover != null
	);

	const jsonLd: WithContext<CollectionPage> = {
		'@type': 'CollectionPage',
		'@context': 'https://schema.org',
		name: `${SITE_NAME} Photography - Destinations`,
		description,
		url: `${SITE_URL}/gallery/destinations`,
		mainEntity: {
			'@type': 'ItemList',
			itemListElement: collections.map((collection) => ({
				'@type': 'ImageGallery',
				name: collection.title,
				description: collection.description,
				url: `${SITE_URL}/gallery/destinations/${slugify(collection.title)}`,
				image: collection.cover!.src,
			})),
		},
	};

	return (
		<main className="grow">
			<Script
				type="application/ld+json"
				id="gallery-destinations_jsonLd"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>

			<PageHeader
				title="Photo Gallery"
				subtitle="Destinations"
				content="Moments, places, and details I've noticed along the way."
			/>

			<Section borderOrigin={'t'}>
				<GalleryView content={collections} category="destinations" />
			</Section>
		</main>
	);
}
