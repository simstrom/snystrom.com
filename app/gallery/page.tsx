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
		<main className="grow mx-auto w-full pt-32 sm:pt-40">
			<PageHeader
				title="Gallery"
				content="A summary of the technologies, design, workflow and decisions behind my website."
			/>
			<GalleryView content={images} cursor={next_cursor} />
		</main>
	);
}
