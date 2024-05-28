'use client';

import { useScroll } from 'framer-motion';
import Button from '../ui/button';
import ParallaxImage from '../ui/parallaxImage';

type Props = {};

export default function GalleryBlock({}: Props) {
	const { scrollY } = useScroll();

	return (
		<div className="relative w-screen max-w-screen-2xl bg-background-secondary xl:rounded-3xl overflow-x-clip">
			<div className="p-4 flex flex-col items-center justify-center text-center gap-y-5 min-h-[600px]">
				<h4 className="text-sm tracking-wider uppercase z-10 text-foreground/50 dark:mix-blend-luminosity">
					Photography
				</h4>
				<h2 className="text-5xl sm:text-6xl md:text-8xl z-10 dark:mix-blend-luminosity">
					Explore the World
				</h2>
				<p className="text-lg pb-5 max-w-lg dark:text-foreground-secondary z-10 dark:mix-blend-luminosity">
					I love building projects and practice my engineering skills, here's an archive of things
					that I've worked on.
				</p>
				<Button className="z-10 after:bg-background/80 after:backdrop-blur-md after:-z-10">
					Gallery Coming Soon
				</Button>
			</div>
			<ParallaxImage
				className="-inset-x-28 top-16 sm:inset-x-24 sm:top-8"
				scrollY={scrollY}
				imgSrc="/images/gallery/hopetoun.jpg"
			/>
			<ParallaxImage
				className="inset-x-80 inset-y-52 hidden xl:block"
				scrollY={scrollY}
				imgSrc="/images/gallery/gatta.jpg"
			/>
			<ParallaxImage
				className="-inset-x-14 -bottom-20 sm:inset-x-6"
				scrollY={scrollY}
				imgSrc="/images/gallery/moreton.jpg"
			/>

			<ParallaxImage
				className="top-24 right-1/3 hidden lg:block"
				scrollY={scrollY}
				imgSrc="/images/gallery/trecime.jpg"
			/>
			<ParallaxImage
				className="-bottom-32 right-80 hidden lg:block"
				scrollY={scrollY}
				imgSrc="/images/gallery/manarola.jpg"
			/>
			<ParallaxImage
				className="top-56 -right-24 sm:top-1/4 sm:right-8"
				scrollY={scrollY}
				imgSrc="/images/gallery/preikestolen.jpg"
			/>
			{/* <div className="absolute h-full w-screen inset-0 -left-5" /> */}
		</div>
	);
}
