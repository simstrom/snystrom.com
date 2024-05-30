import GalleryView from '@/components/sections/galleryView';
import PageHeader from '@/components/ui/pageHeader';
import { GalleryImage } from '@/lib/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Gallery',
	description: 'A summary of the technologies, design, workflow and decisions behind snystrom.com.',
};

const images = [
	{ src: '/images/gallery/forest.jpg', alt: '' },
	{ src: '/images/gallery/gatta.jpg', alt: '' },
	{ src: '/images/gallery/hopetoun.jpg', alt: '' },
	{ src: '/images/gallery/trecime.jpg', alt: '' },
] as Array<GalleryImage>;

export default function Gallery() {
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
