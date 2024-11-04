import { cn } from '@/lib/utils';
import React from 'react';

interface AnimatedBadgeProps {
	as?: any;
	href?: string;
	containerClassName?: string;
	className?: string;
	children: React.ReactNode;
}

export default function AnimatedBadge({
	as: Component = 'button',
	className,
	containerClassName,
	children,
	...otherProps
}: AnimatedBadgeProps) {
	return (
		<Component
			className={cn(
				'group relative grid max-w-fit mx-auto overflow-hidden border dark:border-transparent rounded-full px-4 py-1 bg-background-tertiary dark:bg-transparent shadow-sm dark:shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset]',
				containerClassName
			)}
			{...otherProps}
		>
			<span className="hidden dark:block before:-rotate-90 absolute inset-0 size-full animate-flip overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
			<span className="hidden dark:block absolute inset-px rounded-full dark:bg-background/90" />
			<span className={cn('flex items-center gap-x-2 text-[13px] leading-6 z-10', className)}>
				{children}
			</span>
		</Component>
	);
}
