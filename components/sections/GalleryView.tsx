'use client';

import { useScreenBreakpoints } from '@/lib/hooks';
import { GalleryCollection, GalleryImage } from '@/lib/types';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { getCollections, getImagesInCollection } from '@/lib/gallery';
import GalleryItem from '../ui/GalleryItem';
import Lightbox from '../ui/Lightbox';
import Skeleton from '../ui/Skeleton';

type Props = {
	content: (GalleryImage | GalleryCollection)[];
	cursor?: string;
	as?: 'images' | 'collections';
	title?: string;
};

export default function GalleryView({ content, cursor, as = 'images', title }: Props) {
	const { isSmall, isMedium } = useScreenBreakpoints();
	const [showLightbox, setShowLightbox] = useState<boolean>(false);
	const [lightboxIndex, setLightboxIndex] = useState<number>(0);

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
	const [loadedImages, setLoadedImages] = useState<(GalleryImage | GalleryCollection)[]>(content);
	const [nextCursor, setNextCursor] = useState(cursor);

	const fetchNextImages = async () => {
		if (!loadedImages || !nextCursor) return;

		try {
			setIsLoading(true);

			let items: (GalleryImage | GalleryCollection)[] = [];
			let cursor: string | undefined;
			if (as === 'collections') {
				const { collections, next_cursor } = await getCollections(12, nextCursor);
				items = collections;
				cursor = next_cursor;
			} else {
				const { images, next_cursor } = await getImagesInCollection(title ?? '', 12, nextCursor);
				items = images;
				cursor = next_cursor;
			}

			setLoadedImages((prevImages) => [...prevImages, ...items]);
			setNextCursor(cursor);
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
	loadedImages?.forEach((item, index) => {
		columns[index % (isSmall ? 1 : isMedium ? 2 : 3)].push(item);
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
									isCollection={as === 'collections'}
									item={
										as === 'collections'
											? (item as GalleryCollection).cover
											: (item as GalleryImage)
									}
									collectionTitle={as === 'collections' ? (item as GalleryCollection).title : ''}
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

			{as === 'images' && (
				<Lightbox
					content={loadedImages.filter((item): item is GalleryImage => 'src' in item)}
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
