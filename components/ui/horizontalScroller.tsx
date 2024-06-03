'use client';

import { cn } from '@/lib/utils';
import { Fragment, useEffect, useRef, useState } from 'react';

interface ScrollerProps {
	items: Array<any>;
	separator?: string;
	pauseOnHover?: boolean;
	speed?: 'normal' | 'slow';
	children?: React.ReactNode;
	className?: string;
}

export default function HorizontalScroller({
	items,
	separator,
	pauseOnHover = true,
	speed = 'normal',
	children,
	className,
}: ScrollerProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const scrollerRef = useRef<HTMLUListElement>(null);
	const [start, setStart] = useState(false);

	useEffect(() => {
		addAnimation();
	}, []);

	const addAnimation = () => {
		if (containerRef.current && scrollerRef.current) {
			const scrollerContent = Array.from(scrollerRef.current.children);

			scrollerContent.forEach((item) => {
				const duplicatedItem = item.cloneNode(true);
				if (scrollerRef.current) {
					scrollerRef.current.appendChild(duplicatedItem);
				}
			});

			setStart(true);
		}
	};

	return (
		<div
			ref={containerRef}
			className={cn(
				'scroller overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]',
				className
			)}
		>
			<ul
				ref={scrollerRef}
				className={cn(
					'flex flex-wrap gap-2 sm:gap-3 w-max items-center',
					start && (speed == 'normal' ? 'animate-scroll' : 'animate-scrollSlow'),
					pauseOnHover && 'hover:[animation-play-state:paused]'
				)}
			>
				{items.map((item: any, idx: number) => (
					<Fragment key={idx}>
						<li>{item}</li>
						{separator && <span className="text-brand">{separator}</span>}
					</Fragment>
				))}
			</ul>
		</div>
	);
}
