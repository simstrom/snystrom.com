import PageHeader from '@/components/layouts/PageHeader';
import { Section } from '@/components/layouts/Section';
import GalleryView from '@/components/sections/GalleryView';
import { getCoverImages } from '@/lib/gallery';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
	const collections = (await getCoverImages('destinations')).filter(
		(collection) => collection.cover != null
	);

	const ogImage = collections.length > 0 && collections[0].cover.src;

	const title = 'Destinations - Photo Gallery';
	const description =
		'A summary of the technologies, design, workflow and decisions behind snystrom.com.';

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

	return (
		<main className="grow">
			<PageHeader
				title="Gallery"
				content="A summary of the technologies, design, workflow and decisions behind my website."
				className="pt-32 pb-12 bg-background-secondary"
			/>

			<Section borderOrigin={'t'}>
				<GalleryView content={collections} category="destinations" />
			</Section>
		</main>
	);
}
