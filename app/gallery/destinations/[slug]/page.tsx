import CustomLink from '@/components/blog/link';
import GalleryView from '@/components/sections/galleryView';
import Button from '@/components/ui/button';
import PageHeader from '@/components/ui/pageHeader';
import { galleryDestinations } from '@/lib/data';
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
	const collection = galleryDestinations.find((item) => slugify(item.title) === params.slug);
	if (!collection) return notFound();

	const { title, description, cover } = collection;
	const seoImage = cover
		? `${process.env.NEXT_PUBLIC_SITE_URL}${cover.src}`
		: `${process.env.NEXT_PUBLIC_SITE_URL}/og.png`;

	return {
		title: `Gallery - ${title}`,
		description,
		openGraph: {
			title: `Gallery - ${title}`,
			description,
			url: `${process.env.NEXT_PUBLIC_SITE_URL}/gallery/destinations/${slugify(collection.title)}`,
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

export default async function GalleryDestination({ params }: Props) {
	const index = galleryDestinations.findIndex((item) => slugify(item.title) === params.slug);
	if (index === -1) return notFound();

	const collection = galleryDestinations[index];
	const images = await getImagesInCollection('destinations', params.slug);

	const previousIndex = (index - 1 + galleryDestinations.length) % galleryDestinations.length;
	const nextIndex = (index + 1) % galleryDestinations.length;
	const previousCollection = galleryDestinations[previousIndex];
	const nextCollection = galleryDestinations[nextIndex];

	const backLink = {
		path: '/gallery/destinations',
		name: 'Destinations',
	};

	return (
		<main className="grow mx-auto w-full pt-32 sm:pt-40">
			<div className="absolute -translate-y-6 text-sm font-medium text-foreground-secondary">
				Destination
			</div>
			<PageHeader title={collection.title} content={collection.description} />
			<GalleryView content={images} backLink={backLink} />
			<div className="mt-8 sm:mt-12 w-full flex justify-between items-center sm:gap-4 text-sm font-medium text-foreground-secondary  select-none">
				<Button
					variant="link"
					backLink
					href={`/gallery/destinations/${slugify(previousCollection.title)}`}
					className="hover:text-foreground transition-colors"
				>
					{previousCollection.title}
				</Button>

				<CustomLink href="/gallery/destinations" className="pb-1 font-medium hover:text-foreground">
					Index
				</CustomLink>

				<Button
					variant="link"
					href={`/gallery/destinations/${slugify(nextCollection.title)}`}
					className="hover:text-foreground transition-colors"
				>
					{nextCollection.title}
				</Button>
			</div>
		</main>
	);
}

export async function generateStaticParams() {
	return galleryDestinations.map((item) => ({ slug: slugify(item.title) }));
}
