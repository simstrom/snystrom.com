'use client';

import { cn } from '@/lib/utils';
import { Fragment, useEffect, useRef, useState } from 'react';

interface ScrollerProps {
	items: any;
	separator?: string;
	pauseOnHover?: boolean;
	children?: React.ReactNode;
	className?: string;
}

export default function HorizontalScroller({
	items,
	separator,
	pauseOnHover = true,
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
				'scroller overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
				className
			)}
		>
			<ul
				ref={scrollerRef}
				className={cn(
					'flex gap-4 w-max items-center',
					start && 'animate-scroll ',
					pauseOnHover && 'hover:[animation-play-state:paused]'
				)}
			>
				{items.map((item: any, idx: number) => (
					<Fragment key={idx}>
						<li className="marker:text-primary">{item}</li>
						{separator && <span className="text-primary">•</span>}
					</Fragment>
				))}
			</ul>
		</div>
	);
}
