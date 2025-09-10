import PageHeader from '@/components/layouts/PageHeader';
import { Section } from '@/components/layouts/Section';
import GalleryView from '@/components/sections/GalleryView';
import { getAllImages } from '@/lib/gallery';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
	const { images } = await getAllImages(1);
	const ogImage = images.length > 0 && images[0].src;

	const title = 'Photo Gallery';
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

	return (
		<main className="grow">
			<PageHeader
				title="Gallery"
				content="A summary of the technologies, design, workflow and decisions behind my website."
				className="pt-32 pb-12 bg-background-secondary"
			/>

			<Section borderOrigin={'t'}>
				<GalleryView content={images} cursor={next_cursor} />
			</Section>
		</main>
	);
}
