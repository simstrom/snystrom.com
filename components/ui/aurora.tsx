'use client';

import { Gradient } from '@/lib/gradient';
import { cn } from '@/lib/utils';
import HeroImage from '@/public/images/hero.jpg';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
	showRadialGradient?: boolean;
}

const containerVariant = {
	hidden: {
		opacity: 0,
		scale: 0,
	},
	show: {
		opacity: 1,
		scale: 1,
		transition: {
			type: 'spring',
			stiffness: 180,
			damping: 30,
			delayChildren: 0.3,
			staggerChildren: 0.3,
		},
	},
};
const itemVariant = {
	hidden: { opacity: 0, y: 50 },
	show: {
		opacity: 1,
		y: 0,
		transition: {
			type: 'spring',
			stiffness: 180,
			damping: 30,
		},
	},
};

export const AuroraBackground = ({
	className,
	showRadialGradient = true,
}: AuroraBackgroundProps) => {
	const gradient = new Gradient() as any;

	useEffect(() => {
		gradient.initGradient('#gradient-canvas');
	}, []);

	return (
		<motion.div
			variants={containerVariant}
			initial="hidden"
			animate="show"
			transition={{ type: 'spring', stiffness: 100, damping: 30, staggerChildren: 1 }}
			className={cn('relative origin-bottom', className)}
		>
			<div className="absolute overflow-hidden -z-10 h-full w-full">
				<canvas id="gradient-canvas" data-transition-in className="rounded-3xl" />
			</div>

			{/* <div className="absolute inset-0 overflow-hidden -z-[1]">
				<div
					// beware tailwind trigger warning
					className={cn(
						`
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
            [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-lg invert dark:invert-0
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
            after:dark:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:200%,_100%] 
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-50 will-change-transform`,

						showRadialGradient &&
							`[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
					)}
				></div>
			</div> */}
			<motion.div className="w-full h-full relative flex flex-col gap-4 items-center justify-center">
				<Image
					src={HeroImage}
					alt=""
					priority
					placeholder="blur"
					className="sm:hidden w-32 rounded-full rounded-bl-none"
				/>
				<h1 className="leading-none text-[9vw] tracking-tight flex flex-col gap-1 sm:gap-0 items-center">
					<motion.span
						variants={itemVariant}
						className="sm:flex items-baseline gap-8 lg:gap-10 font-[450]"
					>
						Simon
						<span className="sm:hidden"> </span>
						<Image
							src={HeroImage}
							alt=""
							priority
							placeholder="blur"
							className="hidden sm:block w-32 lg:w-40 rounded-full rounded-bl-none -mr-4"
						/>
						Nyström
					</motion.span>
					<motion.span variants={itemVariant}>Frontend Developer</motion.span>
					<motion.span variants={itemVariant} className="font-[450]">
						Stockholm, Sweden
					</motion.span>
				</h1>
				<motion.h2
					variants={itemVariant}
					className="text-sm xs:text-base sm:text-lg sm:place-self-end mt-4 sm:mt-0 sm:pr-10 lg:pr-20 text-foreground-inverse/50 dark:text-foreground/50"
				>
					* With a splash of Photography
				</motion.h2>
			</motion.div>
			{/* {children} */}
		</motion.div>
	);
};
