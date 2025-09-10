import PageHeader from '@/components/layouts/PageHeader';
import { Section } from '@/components/layouts/Section';
import GalleryView from '@/components/sections/GalleryView';
import { SITE_NAME, SITE_URL } from '@/data/constants';
import { getCoverImages } from '@/lib/gallery';
import { Metadata } from 'next';
import Script from 'next/script';
import { ImageGallery, WithContext } from 'schema-dts';

const title = 'Collections - Photo Gallery';
const description =
	'A summary of the technologies, design, workflow and decisions behind snystrom.com.';

export async function generateMetadata(): Promise<Metadata> {
	const collections = (await getCoverImages('collections')).filter(
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
						'Collections'
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
						'Collections'
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

export default async function Collections() {
	const collections = (await getCoverImages('collections')).filter(
		(collection) => collection.cover != null
	);

	const jsonLd: WithContext<ImageGallery> = {
		'@type': 'ImageGallery',
		'@context': 'https://schema.org',
		name: 'Simon Nyström Photography - Collections',
		description,
		url: `${SITE_URL}/gallery/collections`,
		author: {
			'@type': 'Person',
			name: SITE_NAME,
			url: SITE_URL,
		},
		image: collections.slice(0, 3).map((collection) => collection.cover!.src),
	};

	return (
		<main className="grow">
			<Script
				type="application/ld+json"
				id="gallery-collections_jsonLd"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>

			<PageHeader
				title="Gallery"
				content="A summary of the technologies, design, workflow and decisions behind my website."
				className="pt-32 pb-12 bg-background-secondary"
			/>

			<Section borderOrigin={'t'}>
				<GalleryView content={collections} category="collections" />
			</Section>
		</main>
	);
}
