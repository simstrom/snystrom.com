import PageHeader from '@/components/layouts/PageHeader';
import { Section } from '@/components/layouts/Section';
import GalleryView from '@/components/sections/GalleryView';
import { SITE_NAME, SITE_URL } from '@/data/constants';
import { getAllImages } from '@/lib/gallery';
import { Metadata } from 'next';
import Script from 'next/script';
import { ImageGallery, WithContext } from 'schema-dts';

const title = 'Photo Gallery';
const description = "Moments, places, and details I've noticed along the way.";

export async function generateMetadata(): Promise<Metadata> {
	const { images } = await getAllImages(1);
	const ogImage = images.length > 0 && images[0].src;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			images: [
				{
					url: `/api/ogGallery?title=${encodeURIComponent(
						'Photo Gallery'
					)}&subtitle=${encodeURIComponent(description)}&image=${encodeURIComponent(ogImage)}`,
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
						'Photo Gallery'
					)}&subtitle=${encodeURIComponent(description)}&image=${encodeURIComponent(ogImage)}`,
					width: 1200,
					height: 630,
					alt: `Photo Gallery cover image`,
				},
			],
			card: 'summary_large_image',
		},
	};
}

export default async function Gallery() {
	const { images, next_cursor } = await getAllImages(24); // Initial images, 8 in each column

	const jsonLd: WithContext<ImageGallery> = {
		'@type': 'ImageGallery',
		'@context': 'https://schema.org',
		name: `${SITE_NAME} Photography`,
		description,
		url: `${SITE_URL}/gallery`,
		image: images.slice(0, 3).map((img) => img.src),
	};

	return (
		<main className="grow">
			<Script
				type="application/ld+json"
				id="gallery_jsonLd"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>

			<PageHeader
				title="Photo Gallery"
				content="Moments, places, and details I've noticed along the way."
			/>

			<Section borderOrigin={'t'}>
				<GalleryView content={images} cursor={next_cursor} />
			</Section>
		</main>
	);
}
