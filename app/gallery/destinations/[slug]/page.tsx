import GalleryView from '@/components/sections/galleryView';
import Button from '@/components/ui/button';
import PageHeader from '@/components/ui/pageHeader';
import { SITE_URL } from '@/lib/constants';
import { galleryDestinations } from '@/lib/data';
import { getImagesInCollection } from '@/lib/gallery';
import { slugify } from '@/lib/utils';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
	params: Promise<{
		slug: string;
	}>;
}

export async function generateMetadata(props: Props): Promise<Metadata | undefined> {
    const params = await props.params;
    const collection = galleryDestinations.find((item) => slugify(item.title) === params.slug);
    if (!collection) return notFound();

    const { title, description, cover } = collection;
    const seoImage = cover ? cover.src : '/images/og.webp';

    return {
		title: `Gallery - ${title}`,
		description,
		openGraph: {
			title: `Gallery - ${title}`,
			description,
			url: `${SITE_URL}/gallery/destinations/${slugify(collection.title)}`,
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

export default async function GalleryDestination(props: Props) {
    const params = await props.params;
    const index = galleryDestinations.findIndex((item) => slugify(item.title) === params.slug);
    if (index === -1) return notFound();

    const collection = galleryDestinations[index];
    const { images, next_cursor } = await getImagesInCollection('destinations', params.slug, 24);

    const previousIndex = (index - 1 + galleryDestinations.length) % galleryDestinations.length;
    const nextIndex = (index + 1) % galleryDestinations.length;
    const previousCollection = galleryDestinations[previousIndex];
    const nextCollection = galleryDestinations[nextIndex];

    const backLink = {
		path: '/gallery/destinations',
		name: 'Destinations',
	};

    return (
		<main className="grow pb-20">
			<div className="relative max-w-5xl mx-auto">
				<span className="absolute top-28 px-6 ml-1 -translate-y-1 text-sm font-medium text-brand">
					Destination
				</span>
				<PageHeader
					title={collection.title}
					content={collection.description}
					className="pt-32 pb-12 bg-background-secondary"
				/>
			</div>

			<GalleryView content={images} cursor={next_cursor} backLink={backLink} />

			<div className="mt-8 sm:mt-12 w-full flex justify-between items-center sm:gap-4 text-sm font-medium select-none">
				<Button
					variant="link"
					backLink
					href={`${backLink.path}/${slugify(previousCollection.title)}`}
					className="flex-1 px-6 py-4 text-foreground bg-background-secondary transition-colors hover:bg-foreground hover:text-background"
				>
					{previousCollection.title}
				</Button>

				<Link
					href={backLink.path}
					className="text-center flex-1 px-6 py-4 text-foreground bg-background-secondary transition-colors hover:bg-foreground hover:text-background"
				>
					Index
				</Link>

				<Button
					variant="link"
					href={`${backLink.path}/${slugify(nextCollection.title)}`}
					className="flex-1 px-6 py-4 text-foreground bg-background-secondary transition-colors hover:bg-foreground hover:text-background"
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
