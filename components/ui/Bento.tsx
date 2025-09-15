import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

interface GridProps {
	children: React.ReactNode;
	className?: string;
}

export const Grid = ({ children, className }: GridProps) => {
	return (
		<div
			className={cn(
				'h-120 grid grid-cols-12 auto-rows-fr outline-none divide-x divide-y border-y',
				className
			)}
		>
			{children}
		</div>
	);
};

interface CardProps {
	href: string;
	colSpan: number;
	rowSpan: number;
	containerClassName?: string;
	className?: string;
	children: React.ReactNode;
}

export const Card = ({
	href,
	colSpan,
	rowSpan,
	containerClassName,
	className,
	children,
}: CardProps) => {
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

export default { Grid, Card };
