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
				'group relative flex max-w-5xl w-full mx-auto justify-center overflow-hidden bg-transparent',
				containerClassName
			)}
			{...otherProps}
		>
			<span className="before:-rotate-90 absolute inset-0 size-full animate-flip overflow-hidden [mask:linear-gradient(white,transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,black_360deg)] dark:before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:inset-[0_auto_auto_50%] before:[translate:-50%_-15%]" />
			<span className="absolute inset-px bg-background dark:bg-background/90" />
			<span className={cn('w-full flex items-end gap-x-2 font-medium z-10 p-6', className)}>
				{children}
			</span>
		</Component>
	);
}
