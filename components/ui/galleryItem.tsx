import { IconArrowRight } from '@/lib/icons';
import { GalleryImage } from '@/lib/types';
import { cn, slugify } from '@/lib/utils';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';

type Props = {
	isCollection: boolean;
	item: GalleryImage;
	collectionTitle: string;
	collectionType: string;
	priority: boolean;
	lightboxIndex: number;
	handleImageClick: (e: any, lightboxIndex: number) => void;
};

export default function GalleryItem({
	isCollection,
	item,
	collectionTitle,
	collectionType,
	priority,
	lightboxIndex,
	handleImageClick,
}: Props) {
	if (!item) return;

	return (
		<>
			{isCollection ? (
				<Link
					href={`/gallery/${collectionType}/${slugify(collectionTitle)}`}
					className="relative group hover:scale-[1.03] transition-transform animate-slide"
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
						className="rounded-lg sm:aspect-[4/5] w-full object-cover object-center group-hover:opacity-80 transition-opacity"
					/>
					<div className="rounded-lg bg-gradient-to-t from-black/70 to-transparent to-20% flex items-end p-4 justify-between absolute w-full top-0 bottom-0 text-foreground-inverse dark:text-foreground transition-all">
						<h3 className="sm:text-sm tracking-normal">{collectionTitle}</h3>
						<div className="rounded-full bg-foreground-inverse/20 dark:bg-foreground/20 p-1 transition-all group-hover:scale-110 group-hover:p-2 origin-center">
							<IconArrowRight />
						</div>
					</div>
				</Link>
			) : (
				<div
					className={cn(
						'relative hover:cursor-zoom-in',
						lightboxIndex <= 24 ? 'animate-slide' : 'animate-slideSlow' // Fast animation for images over the fold, slow for scroll loaded.
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
						className="rounded-lg w-full object-cover object-center"
					/>
				</div>
			)}
		</>
	);
}
