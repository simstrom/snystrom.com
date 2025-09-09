import PageHeader from '@/components/layouts/PageHeader';
import { Section } from '@/components/layouts/Section';
import GalleryView from '@/components/sections/GalleryView';
import { getCoverImages } from '@/lib/gallery';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Gallery - Destinations',
	description: 'A summary of the technologies, design, workflow and decisions behind snystrom.com.',
};

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
