import { cn } from '@/lib/utils';
import { MotionValue, motion, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Wobble from './wobble';

type Props = {
	scrollY: MotionValue<number>;
	imgSrc: string;
	imgAlt?: string;
	imgWidth?: number;
	imgHeight?: number;
	className?: string;
};

export default function ParallaxImage({
	scrollY,
	imgSrc,
	imgAlt,
	imgWidth,
	imgHeight,
	className,
}: Props) {
	const ref = useRef<HTMLAnchorElement>(null);
	const [offsetTop, setOffsetTop] = useState<number>(0);

	useEffect(() => {
		if (ref.current) {
			setOffsetTop(ref.current.offsetTop);
		}
	}, [ref]);

	const y = useTransform(scrollY, [offsetTop, offsetTop + 1000], [0, -250]);
	return (
		<Link
			href={'/gallery'}
			className={cn(
				'absolute w-64 blur-[3px] dark:brightness-50 dark:hover:brightness-100 hover:blur-none transition-[filter] duration-500 group',
				className
			)}
			ref={ref}
		>
			<Wobble containerStyle={{ y }}>
				<motion.img
					className="opacity-50 dark:opacity-100 group-hover:opacity-100 transition-opacity duration-500"
					src={imgSrc}
					alt={imgAlt ?? ''}
					height={imgHeight ?? 600}
					width={imgWidth ?? 450}
				/>
			</Wobble>
		</Link>
	);
}
