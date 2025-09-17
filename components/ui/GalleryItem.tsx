'use client';

import { GalleryImage } from '@/lib/types';
import { cn, slugify } from '@/lib/utils';

import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import CardOverlay from './CardOverlay';

type Props = {
	isCollection: boolean;
	item: GalleryImage;
	collectionTitle: string;
	priority: boolean;
	lightboxIndex: number;
	handleImageClick: (e: any, lightboxIndex: number) => void;
};

export default function GalleryItem({
	isCollection,
	item,
	collectionTitle,
	priority,
	lightboxIndex,
	handleImageClick,
}: Props) {
	if (!item) return;

	return (
		<>
			{isCollection ? (
				<Link
					href={`/gallery/${slugify(collectionTitle)}`}
					className="relative group overflow-hidden"
				>
					<CldImage
						src={item.src}
						width={item.width}
						height={item.height}
						alt={item.alt ?? ''}
						priority={priority}
						loading={priority ? 'eager' : 'lazy'}
						placeholder="blur"
						blurDataURL={item.blurData}
						className="sm:aspect-4/5 w-full object-cover object-center transition-opacity"
					/>
					<div className="bg-linear-to-t from-black/80 via-transparent to-transparent flex items-end p-4 justify-between absolute w-full top-0 bottom-0 text-background dark:text-foreground transition-colors duration-300 group-hover:bg-black/20">
						<h3 className="text-2xl font-[550]">{collectionTitle}</h3>
					</div>

					<CardOverlay withIcon />
				</Link>
			) : (
				<div
					className={cn(
						'relative hover:cursor-zoom-in',
						lightboxIndex > 24 && 'animate-slideSlow' // Fast animation for images over the fold, slow for scroll loaded.
					)}
					onClick={(e) => handleImageClick(e, lightboxIndex)}
				>
					<CldImage
						src={item.src}
						width={item.width}
						height={item.height}
						alt={item.alt ?? ''}
						priority={priority}
						loading={priority ? 'eager' : 'lazy'}
						placeholder="blur"
						blurDataURL={item.blurData}
						className="w-full object-cover object-center"
					/>
				</div>
			)}
		</>
	);
}
