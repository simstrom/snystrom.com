'use client';

import { GalleryImage } from '@/lib/types';
import { useScroll } from 'framer-motion';
import { useRef } from 'react';
import Button from '../ui/button';
import ParallaxImage from '../ui/parallaxImage';

type Props = {
	images: Array<GalleryImage>;
};

const imagePositions = [
	'-inset-x-28 top-24 sm:inset-x-24 sm:top-16',
	'inset-x-96 inset-y-80 hidden xl:block',
	'-inset-x-14 -bottom-40 sm:inset-x-6',
	'top-24 right-1/4 hidden lg:block',
	'-bottom-44 right-80 hidden lg:block',
	'top-56 -right-24 sm:right-8',
];

export default function GalleryBlock({ images }: Props) {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start end', 'end start'],
	});

	return (
		<section
			ref={ref}
			className="relative w-screen max-w-screen-2xl bg-background-secondary xl:rounded-3xl overflow-x-clip"
		>
			<div className="p-4 flex flex-col items-center justify-center text-center gap-y-5 min-h-[600px]">
				<h4 className="font-mono uppercase text-xs tracking-wide z-10 text-foreground/50 dark:mix-blend-luminosity">
					Photography
				</h4>
				<h2 className="text-5xl sm:text-6xl md:text-8xl z-10 dark:mix-blend-luminosity">
					Explore the World
				</h2>
				<p className="text-lg pb-5 max-w-lg dark:text-foreground-secondary z-10 dark:mix-blend-luminosity">
					I love building projects and practice my engineering skills, here&apos;s an archive of
					things that I&apos;ve worked on.
				</p>
				<Button
					href="/gallery/destinations"
					className="z-10 after:bg-background-secondary/50 after:backdrop-blur-md after:-z-10 text-xs"
				>
					Discover Destinations
				</Button>
			</div>

			{images.map((image, idx) => (
				<ParallaxImage
					key={image.id + idx}
					className={imagePositions[idx]}
					scrollY={scrollYProgress}
					image={image}
				/>
			))}
		</section>
	);
}
