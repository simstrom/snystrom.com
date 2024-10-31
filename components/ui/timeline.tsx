'use client';
import { timelineData } from '@/lib/data';
import { useScreenBreakpoints } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { motion, useScroll } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

type Props = {
	items: { date: string; title: string; text: string; icon: React.ReactNode }[];
	title: string;
	body: string;
	children: React.ReactNode;
};

export default function Timeline({ items, title, body, children }: Props) {
	const { isSmall } = useScreenBreakpoints();
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

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start center', 'end 0.8'],
	});

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

		window.addEventListener('scroll', checkTouches);
		return () => {
			window.removeEventListener('scroll', checkTouches);
		};
	}, [circleRefs, scrollYProgress]);

	return (
		<section className="flex flex-col items-center">
			<h2 className="text-xl mb-2">{title}</h2>
			<p className="text-foreground-secondary text-sm">{body}</p>
			<div ref={containerRef} className="mt-4 sm:mt-8 flex flex-col sm:items-center relative">
				<motion.div
					ref={lineRef}
					style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
					className="absolute top-0 bottom-0 w-[2px] bg-brand z-20 transition-transform duration-500 ease-out"
				/>
				<motion.div className="absolute top-0 bottom-0 w-[2px] z-10 bg-black/5 dark:bg-white/5" />
				{items.map((item, index) => (
					<TimelineItem
						key={item.title}
						item={item}
						isIndexUneven={index % 2 == 1}
						circleRef={circleRefs[index]}
						isTouched={touchedCircles[index]}
						isSmallScreen={isSmall}
					/>
				))}
			</div>
			{children}
		</section>
	);
}

type TimelineItemProps = {
	item: { date: string; title: string; text: string; icon: React.ReactNode };
	isIndexUneven: boolean;
	circleRef: React.RefObject<HTMLDivElement>;
	isTouched: boolean;
	isSmallScreen: boolean;
};

function TimelineItem({
	item,
	isIndexUneven,
	circleRef,
	isTouched,
	isSmallScreen,
}: TimelineItemProps) {
	return (
		<div className="w-full h-60 relative flex items-center sm:justify-center">
			<div
				ref={circleRef}
				className={cn(
					'absolute w-5 h-5 -left-[9px] sm:left-auto  rounded-full z-10 transition',
					isTouched
						? 'scale-100 bg-brand border-2 border-transparent'
						: 'scale-75 bg-background border-2 border-brand-secondary/80'
				)}
			></div>

			<motion.div
				className={cn('w-full h-full sm:px-0 flex items-center', isIndexUneven && 'sm:justify-end')}
			>
				<motion.div
					initial={{ x: isIndexUneven || isSmallScreen ? -30 : 30, opacity: 0 }}
					animate={{
						x: isTouched ? 0 : isIndexUneven || isSmallScreen ? -30 : 30,
						opacity: isTouched ? 1 : 0,
					}}
					transition={{ type: 'spring', stiffness: 250, damping: 20, mass: 1.1 }}
					className={cn(
						'relative w-full sm:w-1/2 max-h-5/6 flex flex-col justify-center p-8 border bg-background-secondary dark:bg-background-tertiary rounded-xl',
						isIndexUneven || isSmallScreen
							? 'rounded-l-none border-l-transparent'
							: 'sm:rounded-r-none border-r-transparent'
					)}
				>
					<div className="text-sm text-foreground-secondary">{item.date}</div>
					<h3 className="mb-2">{item.title}</h3>
					<p className="text-sm leading-relaxed text-foreground-secondary">{item.text}</p>
					<div className="absolute top-5 right-5 text-foreground-secondary/50">{item.icon}</div>
				</motion.div>
			</motion.div>
		</div>
	);
}
