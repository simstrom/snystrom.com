import PageHeader from '@/components/layouts/PageHeader';
import { Section } from '@/components/layouts/Section';
import GalleryView from '@/components/sections/GalleryView';
import { getAllImages } from '@/lib/gallery';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Gallery',
	description: 'A summary of the technologies, design, workflow and decisions behind snystrom.com.',
};

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
