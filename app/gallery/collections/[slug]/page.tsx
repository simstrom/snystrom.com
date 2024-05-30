import GalleryView from '@/components/sections/galleryView';
import PageHeader from '@/components/ui/pageHeader';
import { galleryCollections } from '@/lib/data';
import { slugify } from '@/lib/utils';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
	params: {
		slug: string;
	};
}

export async function generateMetadata({ params }: Props): Promise<Metadata | undefined> {
	const collection = galleryCollections.find((item) => slugify(item.title) === params.slug);
	if (!collection) return notFound();

	const { title, description, cover } = collection;
	const seoImage = cover ? `https://snystrom.com${cover.src}` : `https://snystrom.com/og.png`;

	return {
		title: `Gallery - ${title}`,
		description,
		openGraph: {
			title: `Gallery - ${title}`,
			description,
			url: `https://snystrom.com/gallery/collections/${slugify(collection.title)}`,
			images: seoImage,
		},
		twitter: {
			title: `Gallery - ${title}`,
			description,
			images: seoImage,
			card: 'summary_large_image',
		},
	};
}

export default async function GalleryCollection({ params }: Props) {
	const collection = galleryCollections.find((item) => slugify(item.title) === params.slug);
	if (!collection) return notFound();

	const backLink = {
		path: '/gallery/collections',
		name: 'Collections',
	};

	return (
		<main className="mx-auto pt-32 sm:pt-40">
			<div className="absolute -translate-y-5 font-mono uppercase text-xs tracking-wide text-foreground-secondary">
				<span className="text-brand">• </span>Collection
			</div>
			<PageHeader title={collection.title} content={collection.description} />
			<GalleryView content={collection.images} backLink={backLink} />
		</main>
	);
}

export async function generateStaticParams() {
	return galleryCollections.map((item) => ({ slug: slugify(item.title) }));
}
