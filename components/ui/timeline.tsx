'use client';
import { cn } from '@/lib/utils';
import { motion, useScroll } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

type Props = {
	className: string;
};

const timelineData = [
	{ year: '2024', text: 'Started working at Sopra' },
	{ year: '2023', text: 'Graduated university' },
	{ year: '2022', text: 'Started learning Next.js' },
	{ year: '2021', text: 'Moved to a new city' },
	{ year: '2020', text: 'Started a new job' },
	// Add more items as needed
];

export default function Timeline({ className }: Props) {
	const containerRef = useRef<HTMLDivElement>(null);
	const lineRef = useRef<HTMLDivElement>(null);
	const [circleRefs, setCircleRefs] = useState<React.RefObject<HTMLDivElement>[]>([]);
	const [touchedCircles, setTouchedCircles] = useState<boolean[]>(
		Array(timelineData.length).fill(false)
	);

	useEffect(() => {
		// Initialize refs for each circle
		setCircleRefs((circleRefs) =>
			Array(timelineData.length)
				.fill(null)
				.map((_, i) => circleRefs[i] || React.createRef<HTMLDivElement>())
		);
	}, []);

	const { scrollYProgress } = useScroll();

	useEffect(() => {
		const checkTouches = () => {
			if (lineRef.current && containerRef.current) {
				const lineHeight = lineRef.current.getBoundingClientRect().height;
				const containerTop = containerRef.current.getBoundingClientRect().top;
				const newTouchedCircles = circleRefs.map((circleRef) => {
					if (circleRef.current) {
						const circleTop = circleRef.current.getBoundingClientRect().top;
						return lineHeight >= circleTop - containerTop;
					}
					return false;
				});
				setTouchedCircles(newTouchedCircles);
			}
		};

		// Add scroll listener to check for touches
		window.addEventListener('scroll', checkTouches);
		return () => {
			window.removeEventListener('scroll', checkTouches);
		};
	}, [circleRefs, scrollYProgress]);

	return (
		<section ref={containerRef} className={cn('w-full relative', className)}>
			<motion.div
				ref={lineRef}
				style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
				className="absolute top-0 bottom-0 sm:left-1/2 sm:-translate-x-1/2 w-[2px] bg-brand z-20 transition-transform duration-500 ease-out"
			/>
			<motion.div className="absolute top-0 bottom-0 sm:left-1/2 sm:-translate-x-1/2 w-[2px] z-10 bg-black/5 dark:bg-white/5" />
			{timelineData.map((item, index) => (
				<div className="h-60 relative">
					<div
						ref={circleRefs[index]}
						className={cn(
							'absolute w-5 h-5 top-1/2 -translate-y-1/2 left-0 sm:left-1/2 sm:-translate-x-1/2 rounded-full z-10 transition duration-500 ease-out',
							touchedCircles[index]
								? 'scale-100 bg-brand border-2 border-transparent'
								: 'scale-75 bg-background border-2 border-brand-secondary/80'
						)}
					></div>

					<motion.div
						className={cn(
							'w-full h-full px-8 sm:px-0 flex items-center',
							index % 2 == 1 && 'sm:justify-end'
						)}
					>
						<motion.div
							initial={{ x: index % 2 == 1 ? -30 : 30, opacity: 0 }}
							animate={{
								x: touchedCircles[index] ? 0 : index % 2 == 1 ? -30 : 30,
								opacity: touchedCircles[index] ? 1 : 0,
							}}
							transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 1.1 }}
							className={cn(
								'w-1/2 max-h-5/6 flex flex-col justify-center p-8 bg-background-secondary dark:bg-background-tertiary rounded-xl',
								index % 2 == 1 ? 'rounded-l-none' : 'rounded-r-none'
							)}
						>
							<div className="font-mono text-xs uppercase tracking-wide text-foreground-secondary">
								Aug, 2024
							</div>
							<h3 className="mb-2">{item.text}</h3>
							<p className="text-sm leading-relaxed text-foreground-secondary">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga voluptas, animi
								aspernatur molestias facilis corrupti nemo.
							</p>
						</motion.div>
					</motion.div>
				</div>
			))}
		</section>
	);
}
