import GalleryView from '@/components/sections/galleryView';
import PageHeader from '@/components/ui/pageHeader';
import { galleryCollections } from '@/lib/data';
import { IconArrowLeft, IconArrowRight } from '@/lib/icons';
import { slugify } from '@/lib/utils';
import { Metadata } from 'next';
import Link from 'next/link';
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

export default function GalleryCollection({ params }: Props) {
	const index = galleryCollections.findIndex((item) => slugify(item.title) === params.slug);
	if (index === -1) return notFound();
	const collection = galleryCollections[index];

	const previousIndex = (index - 1 + galleryCollections.length) % galleryCollections.length;
	const nextIndex = (index + 1) % galleryCollections.length;
	const previousCollection = galleryCollections[previousIndex];
	const nextCollection = galleryCollections[nextIndex];

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
			<div className="mt-8 sm:mt-12 w-full flex justify-center items-center sm:gap-4 text-xs font-mono uppercase tracking-wide select-none">
				<Link
					href={`/gallery/destinations/${slugify(previousCollection.title)}`}
					className="w-full flex items-center justify-end gap-1 p-4 group hover:text-brand transition duration-300"
				>
					<IconArrowLeft
						width={12}
						className="group-hover:-translate-x-1 transition-transform duration-300"
					/>
					{previousCollection.title}
				</Link>
				<span className="opacity-25">|</span>
				<Link href="/gallery/destinations" className="p-4 hover:text-brand transition duration-300">
					Index
				</Link>
				<span className="opacity-25">|</span>

				<Link
					href={`/gallery/destinations/${slugify(nextCollection.title)}`}
					className="w-full flex items-center gap-1 p-4 group hover:text-brand transition duration-300"
				>
					{nextCollection.title}
					<IconArrowRight
						width={12}
						className="group-hover:translate-x-1 transition-transform duration-300"
					/>
				</Link>
			</div>
		</main>
	);
}

export async function generateStaticParams() {
	return galleryCollections.map((item) => ({ slug: slugify(item.title) }));
}
