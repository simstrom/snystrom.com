'use client';

import { GalleryImage } from '@/lib/types';
import { AnimatePresence, motion } from 'framer-motion';
import { CldImage } from 'next-cloudinary';
import { useEffect, useRef, useState } from 'react';

type Props = {
	content: Array<GalleryImage>;
	current: number;
	setCurrent: React.Dispatch<React.SetStateAction<number>>;
	isVisible: boolean;
	isMobile: boolean;
	onClose: () => void;
};

export default function Lightbox({
	content,
	current,
	setCurrent,
	isVisible,
	isMobile,
	onClose,
}: Props) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isLoading, setIsLoading] = useState(true);

	const handleKeyDown = (e: any) => {
		if (e.key === 'Escape') onClose();
		if (e.key === 'ArrowLeft') showPrev(e);
		if (e.key === 'ArrowRight') showNext(e);
	};

	const handleScroll = () => {
		setTimeout(() => {
			onClose();
		}, 300);
	};

	const showNext = (e: any) => {
		e.stopPropagation();
		setCurrent((prevIndex) => (prevIndex + 1) % content.length);
	};
	const showPrev = (e: any) => {
		e.stopPropagation();
		setCurrent((prevIndex) => (prevIndex - 1 + content.length) % content.length);
	};

	useEffect(() => {
		const container = containerRef.current;
		if (isVisible) {
			window.addEventListener('scroll', handleScroll);

			container?.focus();
			container?.addEventListener('keydown', handleKeyDown);
		}

		return () => {
			window.removeEventListener('scroll', handleScroll);
			container?.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleKeyDown, handleScroll, isVisible]);

	return (
		<AnimatePresence>
			{isVisible && (
				<>
					<motion.div
						className="fixed z-[99] top-0 left-0 w-full h-full flex justify-center bg-background/90"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<motion.div
							className="absolute bottom-10 font-medium text-sm"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ delay: 0.5 }}
						>
							{current + 1} / {content.length}
						</motion.div>
					</motion.div>
					<div
						ref={containerRef}
						onClick={() => onClose()}
						tabIndex={-1}
						onKeyDown={handleKeyDown}
						className="fixed z-[100] top-0 left-0 w-full h-full flex items-center justify-center focus-visible:outline-none p-14 sm:p-20"
					>
						<motion.div
							initial={{
								y: '100%',
								opacity: 0,
							}}
							animate={{ y: !isLoading ? 0 : '100%', opacity: !isLoading ? 1 : 0 }}
							exit={{
								y: '100%',
								opacity: 0,
							}}
							transition={{ type: 'spring', stiffness: 200, damping: 30 }}
							drag={isMobile ? 'x' : false}
							dragConstraints={{ left: 0, right: 0 }}
							onDragEnd={(event, info) => {
								if (info.offset.x < -100) {
									showNext(event);
								} else if (info.offset.x > 100) {
									showPrev(event);
								}
							}}
							className="w-full h-full relative"
						>
							<CldImage
								src={content[current].src}
								alt={content[current].alt ?? ''}
								width={content[current].width}
								height={content[current].height}
								loading="eager"
								draggable={false}
								className="h-full w-full object-contain"
								onLoad={() => setIsLoading(false)}
							/>
						</motion.div>
					</div>
				</>
			)}
		</AnimatePresence>
	);
}
