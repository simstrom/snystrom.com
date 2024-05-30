import GalleryView from '@/components/sections/galleryView';
import PageHeader from '@/components/ui/pageHeader';
import { galleryDestinations } from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Gallery - Destinations',
	description: 'A summary of the technologies, design, workflow and decisions behind snystrom.com.',
};

export default function Destinations() {
	return (
		<main className="mx-auto pt-32 sm:pt-40">
			<PageHeader
				title="Gallery"
				content="A summary of the technologies, design, workflow and decisions behind my website."
			/>
			<GalleryView content={galleryDestinations} />
		</main>
	);
}
