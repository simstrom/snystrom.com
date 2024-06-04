import { GalleryImage } from '@/lib/types';
import { cn } from '@/lib/utils';
import { MotionValue, useSpring, useTransform } from 'framer-motion';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import Wobble from './wobble';

type Props = {
	scrollY: MotionValue<number>;
	image: GalleryImage;
	className?: string;
};

export default function ParallaxImage({ scrollY, image, className }: Props) {
	const pos = useTransform(scrollY, [0, 1], [0, -200]);
	const y = useSpring(pos, { stiffness: 200, damping: 25 });

	return (
		<div className={cn('absolute w-64', className)}>
			<Wobble containerStyle={{ y }}>
				<Link
					href={'/gallery'}
					className="pointer-events-none sm:pointer-events-auto blur-[3px] dark:brightness-50 dark:hover:brightness-100 hover:blur-none transition-[filter] duration-500 group"
				>
					<CldImage
						src={image.src}
						width={256}
						height={320}
						alt={image.alt ?? ''}
						placeholder="blur"
						blurDataURL={image.blurData}
						className="aspect-[4/5] object-cover object-center opacity-50 dark:opacity-100 group-hover:opacity-100 transition-opacity duration-500"
					/>
				</Link>
			</Wobble>
		</div>
	);
}
