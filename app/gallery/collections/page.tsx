import GalleryView from '@/components/sections/galleryView';
import PageHeader from '@/components/ui/pageHeader';
import { getCoverImages } from '@/lib/gallery';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Gallery - Collections',
	description: 'A summary of the technologies, design, workflow and decisions behind snystrom.com.',
};

export default async function Destinations() {
	const collections = await getCoverImages('collections');

	return (
		<main className="grow mx-auto w-full pt-32 sm:pt-40">
			<PageHeader
				title="Gallery"
				content="A summary of the technologies, design, workflow and decisions behind my website."
			/>
			<GalleryView content={collections} category="collections" />
		</main>
	);
}
