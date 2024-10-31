'use client';

import { useScreenBreakpoints } from '@/lib/hooks';
import { GalleryCollection, GalleryImage } from '@/lib/types';
import { motion, useScroll, useTransform } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Button from '../ui/button';
import GalleryItem from '../ui/galleryItem';
import Lightbox from '../ui/lightbox';
import TabList from '../ui/tabList';

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
			<div className="my-8 sm:pt-12 flex font-medium text-foreground-secondary">
				{backLink ? (
					<Button
						variant="link"
						backLink
						href={backLink.path}
						className="hover:text-foreground transition-colors mt-2"
					>
						Back to all {backLink.name}
					</Button>
				) : (
					<TabList
						labels={GalleryRoutes.map((route) => route.name)}
						asLinks
						links={GalleryRoutes.map((route) => route.path)}
						selected={GalleryRoutes.findIndex((route) => route.path === currentPath)}
					/>
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
