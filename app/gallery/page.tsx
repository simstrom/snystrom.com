import GalleryView from '@/components/sections/galleryView';
import PageHeader from '@/components/ui/pageHeader';
import { getAllImages } from '@/lib/gallery';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Gallery',
	description: 'A summary of the technologies, design, workflow and decisions behind snystrom.com.',
};

export default async function Gallery() {
	const images = await getAllImages();

	return (
		<main className="mx-auto pt-32 sm:pt-40">
			<PageHeader
				title="Gallery"
				content="A summary of the technologies, design, workflow and decisions behind my website."
			/>
			<GalleryView content={images} />
		</main>
	);
}
