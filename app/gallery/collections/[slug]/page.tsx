import CustomLink from '@/components/blog/link';
import GalleryView from '@/components/sections/galleryView';
import Button from '@/components/ui/button';
import PageHeader from '@/components/ui/pageHeader';
import { SITE_URL } from '@/lib/constants';
import { galleryCollections } from '@/lib/data';
import { getImagesInCollection } from '@/lib/gallery';
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
	const seoImage = cover ? cover.src : '/images/og.webp';

	return {
		title: `Gallery - ${title}`,
		description,
		openGraph: {
			title: `Gallery - ${title}`,
			description,
			url: `${SITE_URL}/gallery/collections/${slugify(collection.title)}`,
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
	const index = galleryCollections.findIndex((item) => slugify(item.title) === params.slug);
	if (index === -1) return notFound();

	const collection = galleryCollections[index];
	const { images, next_cursor } = await getImagesInCollection('collections', params.slug, 24);

	const previousIndex = (index - 1 + galleryCollections.length) % galleryCollections.length;
	const nextIndex = (index + 1) % galleryCollections.length;
	const previousCollection = galleryCollections[previousIndex];
	const nextCollection = galleryCollections[nextIndex];

	const backLink = {
		path: '/gallery/collections',
		name: 'Collections',
	};

	return (
		<main className="grow mx-auto w-full pt-32 sm:pt-40">
			<div className="absolute -translate-y-6 text-sm font-medium text-foreground-secondary">
				Collection
			</div>
			<PageHeader title={collection.title} content={collection.description} />
			<GalleryView content={images} cursor={next_cursor} backLink={backLink} />
			<div className="mt-8 sm:mt-12 w-full flex justify-between items-center sm:gap-4 text-sm font-medium text-foreground-secondary  select-none">
				<Button
					variant="link"
					backLink
					href={`/gallery/collections/${slugify(previousCollection.title)}`}
					className="hover:text-foreground transition-colors"
				>
					{previousCollection.title}
				</Button>

				<CustomLink href="/gallery/collections" className="pb-1 font-medium hover:text-foreground">
					Index
				</CustomLink>

				<Button
					variant="link"
					href={`/gallery/collections/${slugify(nextCollection.title)}`}
					className="hover:text-foreground transition-colors"
				>
					{nextCollection.title}
				</Button>
			</div>
		</main>
	);
}

export async function generateStaticParams() {
	return galleryCollections.map((item) => ({ slug: slugify(item.title) }));
}
