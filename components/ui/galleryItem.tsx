import { IconArrowRight } from '@/lib/icons';
import { GalleryImage } from '@/lib/types';
import { slugify } from '@/lib/utils';
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
	return (
		<>
			{isCollection ? (
				<Link
					href={`/gallery/${collectionType}/${slugify(collectionTitle)}`}
					className="relative group hover:scale-[1.03] transition-transform duration-500 ease-in-out"
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
						className="border border-black sm:aspect-[4/5] w-full object-cover object-center group-hover:opacity-80 transition-opacity duration-500"
					/>
					<div className="bg-black flex items-center justify-between absolute w-full top-0 sm:bottom-0 sm:top-auto py-0.5 px-4 text-foreground-inverse dark:text-foreground group-hover:py-5 transition-all duration-500">
						<h3 className="font-mono text-xs tracking-tight">{collectionTitle}</h3>
						<IconArrowRight width={12} />
					</div>
				</Link>
			) : (
				<div
					className="relative hover:cursor-zoom-in"
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
						className="border border-black w-full object-cover object-center transition-opacity duration-500"
					/>
				</div>
			)}
		</>
	);
}
