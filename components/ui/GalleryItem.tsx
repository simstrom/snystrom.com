'use client';

import { GalleryImage } from '@/lib/types';
import { cn, slugify } from '@/lib/utils';

import { IconArrowUpRight, IconGallery } from '@/data/icons';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';

type Props = {
	isCollection: boolean;
	item: GalleryImage;
	collectionTitle: string;
	collectionSize: number;
	priority: boolean;
	lightboxIndex: number;
	handleImageClick: (e: any, lightboxIndex: number) => void;
};

export default function GalleryItem({
	isCollection,
	item,
	collectionTitle,
	collectionSize,
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
						className="aspect-square w-full object-cover object-center rounded-xl"
					/>
					<div className="rounded-xl bg-linear-to-t from-foreground/80 dark:from-background/80 via-transparent to-transparent flex flex-col items-start justify-end p-4 absolute w-full top-0 bottom-0 text-background dark:text-foreground transition-colors duration-300 group-hover:bg-background/20">
						<div className="text-xs flex items-center gap-1 opacity-80">
							<IconGallery />
							{collectionSize}
						</div>
						<h3 className="text-xl">{collectionTitle}</h3>
					</div>

					<div
						className={cn(
							'absolute right-4 -bottom-2 z-20 w-fit h-fit rounded-full p-2 bg-foreground text-background dark:bg-background dark:text-foreground',
							'opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-6 user-select-none pointer-events-none '
						)}
					>
						<IconArrowUpRight className="w-4 h-4" />
					</div>
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
