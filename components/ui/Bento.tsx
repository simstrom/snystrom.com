import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

interface GridProps {
	children: React.ReactNode;
	className?: string;
}

function BentoGrid({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			className={cn(
				'h-120 grid grid-cols-12 auto-rows-fr outline-none divide-x divide-y border-y',
				className
			)}
			{...props}
		></div>
	);
}

interface BentoCardProps {
	href: string;
	colSpan: number;
	rowSpan: number;
	containerClassName?: string;
	className?: string;
	children: React.ReactNode;
}

const BentoCard = ({
	href,
	colSpan,
	rowSpan,
	containerClassName,
	className,
	children,
}: BentoCardProps) => {
	return (
		<div
			className={containerClassName}
			style={{
				gridColumn: `span ${colSpan}`,
				gridRow: `span ${rowSpan}`,
			}}
		>
			<Link
				href={href}
				className={cn(
					'relative flex h-full w-full p-4 rounded-2xl overflow-hidden group',
					'bg-background-secondary ring-1 ring-border ',
					'transition-colors hover:bg-background',
					className
				)}
			>
				{children}
			</Link>
		</div>
	);
};

export { BentoCard, BentoGrid };
