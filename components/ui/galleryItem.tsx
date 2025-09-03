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
					className="relative group rounded-lg overflow-hidden"
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
						className="sm:aspect-[4/5] w-full object-cover object-center group-hover:opacity-80 transition-opacity"
					/>
					<div className="bg-gradient-to-t from-black/70 to-transparent to-20% flex items-end p-4 justify-between absolute w-full top-0 bottom-0 text-background dark:text-foreground">
						<h3 className="text-3xl font-medium">{collectionTitle}</h3>
						<div className="rounded-xl bg-white/10 p-2 transition-transform group-hover:scale-110 origin-center">
							<IconArrowRight width={24} height={24} />
						</div>
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
