'use client';

import { useScreenBreakpoints } from '@/lib/hooks';
import { IconArrowLeft } from '@/lib/icons';
import { GalleryCollection, GalleryImage } from '@/lib/types';
import { cn } from '@/lib/utils';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import GalleryItem from '../ui/galleryItem';
import Lightbox from '../ui/lightbox';

type Props = {
	content: Array<GalleryImage> | Array<GalleryCollection>;
	backLink?: { path: string; name: string };
	category?: 'destinations' | 'collections';
};

const GalleryRoutes = [
	{
		path: '/gallery',
		name: 'Images',
	},
	{
		path: '/gallery/destinations',
		name: 'Destinations',
	},
	{
		path: '/gallery/collections',
		name: 'Collections',
	},
];

export default function GalleryView({ content, backLink, category }: Props) {
	const { isSmall, isMedium } = useScreenBreakpoints();
	const [showLightbox, setShowLightbox] = useState<boolean>(false);
	const [lightboxIndex, setLightboxIndex] = useState<number>(0);
	const currentPath = usePathname();

	const { scrollY } = useScroll();
	const ref = useRef<HTMLDivElement>(null);
	const [offsetTop, setOffsetTop] = useState<number>(0);
	const animationUnevenCol = useTransform(scrollY, [offsetTop, offsetTop + 2000], [0, -100]);
	const animationEvenCol = useTransform(scrollY, [offsetTop, offsetTop + 2000], [0, -500]);

	useEffect(() => {
		if (ref.current) {
			setOffsetTop(ref.current.offsetTop);
		}
	}, [ref]);

	const columns: any = [[], [], []];
	content.forEach((item, index) => {
		columns[index % (isSmall ? 1 : isMedium ? 2 : 3)].push(
			category ? (item as GalleryCollection) : (item as GalleryImage)
		);
	});

	const calculateLightboxIndex = (colIndex: number, n: number) => {
		const start = isSmall ? 1 : isMedium ? 2 : 3;
		return colIndex + start * n;
	};

	const handleImageClick = (e: any, lightboxIndex: number) => {
		setLightboxIndex(lightboxIndex);
		setShowLightbox(true);
	};

	return (
		<>
			<div className="py-8 sm:pt-12 flex font-mono text-xs tracking-tight text-foreground-secondary">
				{backLink ? (
					<Link
						href={backLink.path}
						className="inline-flex w-fit items-center gap-x-1 hover:text-brand transition duration-300 group"
					>
						<IconArrowLeft
							width={12}
							height={12}
							className="group-hover:-translate-x-1 transition-transform duration-300"
						/>
						Back to all {backLink.name}
					</Link>
				) : (
					<>
						<span className="border-r-2 pr-4 select-none opacity-60 uppercase tracking-wide">
							View As
						</span>
						{GalleryRoutes.map((route) => (
							<Link
								key={route.name}
								href={route.path}
								className={cn(
									'pl-4 uppercase tracking-wide hover:text-foreground transition',
									route.path == currentPath && 'text-brand'
								)}
							>
								{route.name}
							</Link>
						))}
					</>
				)}
			</div>

			<div ref={ref} className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 h-fit animate-slide">
				{columns.map((col: Array<GalleryCollection | GalleryImage>, colIndex: number) => {
					return (
						<motion.div
							key={colIndex}
							style={colIndex % 2 == 0 ? { y: animationEvenCol } : { y: animationUnevenCol }}
							className="flex flex-col gap-4"
						>
							{col.map((item, idx) => (
								<GalleryItem
									key={idx}
									isCollection={!!category}
									item={category ? (item as GalleryCollection).cover : (item as GalleryImage)}
									collectionTitle={category ? (item as GalleryCollection).title : ''}
									collectionType={category ?? ''}
									priority={idx == 0 ? true : false}
									lightboxIndex={calculateLightboxIndex(colIndex, idx)}
									handleImageClick={handleImageClick}
								/>
							))}
						</motion.div>
					);
				})}
			</div>

			{!category && (
				<Lightbox
					content={content as GalleryImage[]}
					current={lightboxIndex}
					setCurrent={setLightboxIndex}
					isVisible={showLightbox}
					onClose={() => setShowLightbox(false)}
					isMobile={isSmall}
				/>
			)}
		</>
	);
}
