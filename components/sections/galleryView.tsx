'use client';

import { getAllImages } from '@/lib/gallery';
import { useScreenBreakpoints } from '@/lib/hooks';
import { GalleryCollection, GalleryImage } from '@/lib/types';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Button from '../ui/button';
import GalleryItem from '../ui/galleryItem';
import Lightbox from '../ui/lightbox';
import Skeleton from '../ui/skeleton';
import TabList from '../ui/tabList';

type Props = {
	content: (GalleryImage | GalleryCollection)[];
	cursor?: string;
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

export default function GalleryView({ content, cursor, backLink, category }: Props) {
	const { isSmall, isMedium } = useScreenBreakpoints();
	const [showLightbox, setShowLightbox] = useState<boolean>(false);
	const [lightboxIndex, setLightboxIndex] = useState<number>(0);
	const currentPath = usePathname();

	// Column animation properties
	const { scrollY } = useScroll();
	const animationRef = useRef<HTMLDivElement>(null);
	const [offsetTop, setOffsetTop] = useState<number>(0);
	const animationUnevenCol = useTransform(scrollY, [offsetTop, offsetTop + 2000], [0, -100]);
	const animationEvenCol = useTransform(scrollY, [offsetTop, offsetTop + 2000], [0, -500]);

	// Infinite scroll properties
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const viewRef = useRef<HTMLDivElement>(null);
	const inView = useInView(viewRef, { margin: '0px 0px 30% 0px' });
	const [loadedImages, setLoadedImages] = useState<GalleryImage[] | null>(
		!category ? (content as GalleryImage[]) : null
	);
	const [nextCursor, setNextCursor] = useState(cursor);

	const fetchNextImages = async () => {
		if (!loadedImages || !nextCursor) return;

		try {
			setIsLoading(true);
			const nextImages = await getAllImages(12, nextCursor); // Fetch 4 images per column.
			setLoadedImages((prevImages) => [...(prevImages as GalleryImage[]), ...nextImages.images]);
			setNextCursor(nextImages.next_cursor);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			console.error('Error fetching next images');
		}
	};

	useEffect(() => {
		if (inView && nextCursor) {
			fetchNextImages();
		}
	}, [inView, nextCursor]);

	useEffect(() => {
		if (animationRef.current) {
			setOffsetTop(animationRef.current.offsetTop);
		}
	}, [animationRef]);

	const columns: (GalleryImage | GalleryCollection)[][] = [[], [], []];
	(!category ? (loadedImages as GalleryImage[]) : content).forEach((item, index) => {
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
			<div className="border-b">
				{backLink ? (
					<Button
						variant="link"
						backLink
						href={backLink.path}
						className="hover:text-background hover:bg-foreground transition-colors p-6 pr-8"
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

			<div ref={animationRef} className="pt-2 px-2 grid sm:grid-cols-2 md:grid-cols-3 gap-2 h-fit">
				{columns.map((col, colIndex: number) => {
					return (
						<motion.div
							key={colIndex}
							style={colIndex % 2 == 0 ? { y: animationEvenCol } : { y: animationUnevenCol }}
							className="flex flex-col gap-2"
						>
							{col.map((item, idx) => (
								<GalleryItem
									key={idx}
									isCollection={!!category}
									item={category ? (item as GalleryCollection).cover : (item as GalleryImage)}
									collectionTitle={category ? (item as GalleryCollection).title : ''}
									collectionType={category ?? ''}
									priority={idx <= 2 ? true : false}
									lightboxIndex={calculateLightboxIndex(colIndex, idx)}
									handleImageClick={handleImageClick}
								/>
							))}
							{isLoading && (
								<>
									<Skeleton className="w-full h-[400px] animate-slide" />
									<Skeleton className="w-full h-[400px] animate-slide" />
								</>
							)}
						</motion.div>
					);
				})}
			</div>
			<div ref={viewRef} />

			{!category && (
				<Lightbox
					content={loadedImages ?? (content as GalleryImage[])}
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
