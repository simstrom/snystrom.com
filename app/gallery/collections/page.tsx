import GalleryView from '@/components/sections/galleryView';
import PageHeader from '@/components/ui/pageHeader';
import { getCoverImages } from '@/lib/gallery';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Gallery - Collections',
	description: 'A summary of the technologies, design, workflow and decisions behind snystrom.com.',
};

export default async function Destinations() {
	const collections = (await getCoverImages('collections')).filter(
		(collection) => collection.cover != null
	);

	return (
		<main className="grow">
			<PageHeader
				title="Gallery"
				content="A summary of the technologies, design, workflow and decisions behind my website."
				className="pt-32 pb-12 bg-background-secondary"
			/>

			<div className="pb-20 border-x">
				<GalleryView content={collections} category="collections" />
			</div>
		</main>
	);
}
