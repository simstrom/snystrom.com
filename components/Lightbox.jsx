import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { CloseIcon, LeftChevron, RightChevron } from './Icons';

const transition = {
	type: 'spring',
	damping: 30,
	stiffness: 200,
	opacity: { duration: 0.2 },
};

export default function Lightbox({ images, currImage, setCurrImage, showLightbox, hideLightbox }) {
	const lightboxRef = useRef(null);

	const handleKeyDown = (e) => {
		if (e.key === 'Escape') hideLightbox();
		if (e.key === 'ArrowLeft') showPrev(e);
		if (e.key === 'ArrowRight') showNext(e);
	};

	const showNext = (e) => {
		e.stopPropagation();
		setCurrImage(currImage >= images.length - 1 ? 0 : currImage + 1);
	};
	const showPrev = (e) => {
		e.stopPropagation();
		setCurrImage(currImage === 0 ? images.length - 1 : currImage - 1);
	};

	const handleScroll = () => {
		setTimeout(() => {
			hideLightbox();
		}, 300);
	};
	useEffect(() => {
		showLightbox && window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	return (
		<AnimatePresence>
			{showLightbox && (
				<motion.div
					className="fixed z-10 top-0 left-0 w-full h-full pt-14 bg-primary/90 backdrop-blur-sm flex items-center justify-between"
					onClick={hideLightbox}
					ref={lightboxRef}
					tabIndex={-1}
					onKeyDown={handleKeyDown}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={transition}
				>
					<motion.button
						className="fixed top-14 right-0 px-2 m-6"
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
					>
						<CloseIcon className={'h-5 w-5'} />
					</motion.button>
					<motion.button
						onClick={(e) => showPrev(e)}
						whileHover={{ scale: 1.2 }}
						whileTap={{ scale: 0.9 }}
						className="p-4"
					>
						<LeftChevron />
					</motion.button>

					<div className="relative">
						<Image src={images[currImage].url} alt="" draggable={false} className="px-14" />
					</div>

					<motion.button
						onClick={(e) => showNext(e)}
						whileHover={{ scale: 1.2 }}
						whileTap={{ scale: 0.9 }}
						className="p-4"
					>
						<RightChevron />
					</motion.button>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
