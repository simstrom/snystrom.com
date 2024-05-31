import { IconArrowRight } from '@/lib/icons';
import { GalleryImage } from '@/lib/types';
import { cn, slugify } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

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
	const [isLoading, setisLoading] = useState(true);

	return (
		<>
			{isCollection ? (
				<Link
					href={`/gallery/${collectionType}/${slugify(collectionTitle)}`}
					className="relative group hover:scale-[1.03] transition-transform duration-500 ease-in-out"
				>
					<Image
						src={item.src}
						width={500}
						height={625}
						alt={item.alt}
						priority={priority}
						loading={priority ? 'eager' : 'lazy'}
						onLoad={() => setisLoading(false)}
						className={cn(
							'border border-black sm:max-h-[506px] w-full object-cover object-center group-hover:opacity-80 transition-opacity duration-500',
							!isLoading ? 'opacity-100' : 'opacity-0'
						)}
					/>
					<div className="bg-black flex items-center justify-between absolute w-full top-0 sm:bottom-0 sm:top-auto py-0.5 px-4 text-foreground-inverse dark:text-foreground group-hover:py-5 transition-all duration-500">
						<h3 className="font-mono text-xs tracking-tight">{collectionTitle}</h3>
						<IconArrowRight width={12} />
					</div>
					<div
						className={cn(
							'absolute inset-0 bg-background-tertiary transition-opacity duration-500',
							!isLoading && 'opacity-0'
						)}
					/>
				</Link>
			) : (
				<div
					className="relative hover:cursor-zoom-in"
					onClick={(e) => handleImageClick(e, lightboxIndex)}
				>
					<Image
						src={item.src}
						width={500}
						height={625}
						alt={item.alt}
						priority={priority}
						loading={priority ? 'eager' : 'lazy'}
						className={cn(
							'border border-black sm:max-h-[506px] w-full object-cover object-center transition-opacity duration-500',
							!isLoading ? 'opacity-100' : 'opacity-0'
						)}
						onLoad={() => setisLoading(false)}
					/>
					<div
						className={cn(
							'absolute inset-0 bg-background-tertiary transition-opacity duration-500',
							!isLoading && 'opacity-0'
						)}
					/>
				</div>
			)}
		</>
	);
}
