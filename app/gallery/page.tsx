import GalleryView from '@/components/sections/galleryView';
import PageHeader from '@/components/ui/pageHeader';
import { getAllImages } from '@/lib/gallery';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Gallery',
	description: 'A summary of the technologies, design, workflow and decisions behind snystrom.com.',
};

export default async function Gallery() {
	const { images, next_cursor } = await getAllImages(24); // Initial images, 8 in each column

	return (
		<main className="grow pb-20">
			<PageHeader
				title="Gallery"
				content="A summary of the technologies, design, workflow and decisions behind my website."
				className="pt-32 pb-12 bg-background-secondary"
			/>

			<GalleryView content={images} cursor={next_cursor} />
		</main>
	);
}
