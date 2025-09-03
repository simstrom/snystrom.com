'use client';

import { GalleryImage } from '@/lib/types';
import { cn } from '@/lib/utils';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { CldImage } from 'next-cloudinary';
import { useRef } from 'react';

type Props = {
	items: Array<GalleryImage>;
	className?: string;
};

export default function HorizontalImages({ items, className }: Props) {
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start end', 'end start'],
	});
	const x = useTransform(scrollYProgress, [0, 1], [0, -800]); // Adjust the values as needed
	const spring = useSpring(x, { stiffness: 150, damping: 30 });

	return (
		<div className={cn('flex justify-center overflow-x-clip', className)}>
			<motion.div
				ref={containerRef}
				style={{ x: spring, rotate: '-3deg' }}
				className="w-screen flex justify-center gap-2 max-h-64"
			>
				{items.map((item, idx) => (
					<CldImage
						key={idx}
						src={item.src}
						alt={item.alt ?? ''}
						width={item.width}
						height={item.height}
						placeholder="blur"
						blurDataURL={item.blurData}
						className="h-full w-auto border border-black rounded-xl"
					/>
				))}
			</motion.div>
		</div>
	);
}
