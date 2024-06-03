import { GalleryImage } from '@/lib/types';
import { cn } from '@/lib/utils';
import { MotionValue, useTransform } from 'framer-motion';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Wobble from './wobble';

type Props = {
	scrollY: MotionValue<number>;
	image: GalleryImage;
	className?: string;
};

export default function ParallaxImage({ scrollY, image, className }: Props) {
	const ref = useRef<HTMLAnchorElement>(null);
	const [offsetTop, setOffsetTop] = useState<number>(0);

	useEffect(() => {
		if (ref.current) {
			setOffsetTop(ref.current.offsetTop);
		}
	}, [ref]);

	const y = useTransform(scrollY, [offsetTop, offsetTop + 2000], [0, -300]);
	return (
		<Link
			href={'/gallery'}
			className={cn(
				'pointer-events-none sm:pointer-events-auto absolute w-64 blur-[3px] dark:brightness-50 dark:hover:brightness-100 hover:blur-none transition-[filter] duration-500 group',
				className
			)}
			ref={ref}
		>
			<Wobble containerStyle={{ y }}>
				<CldImage
					src={image.src}
					width={256}
					height={320}
					alt={image.alt ?? ''}
					placeholder="blur"
					blurDataURL={image.blurData}
					className="aspect-[4/5] object-cover object-center opacity-50 dark:opacity-100 group-hover:opacity-100 transition-opacity duration-500"
				/>
			</Wobble>
		</Link>
	);
}
