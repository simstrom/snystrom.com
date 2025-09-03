'use client';

import { cn } from '@/lib/utils';
import { LayoutGroup, motion } from 'framer-motion';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';

interface TabListProps {
	labels: string[];
	selected: number;
	setSelected?: Dispatch<SetStateAction<number>>;
	asLinks?: boolean;
	links?: string[];
	className?: string;
}

export default function TabList({
	labels,
	selected,
	setSelected,
	asLinks = false,
	links,
	className,
}: TabListProps) {
	return (
		<LayoutGroup>
			<div
				className={cn(
					'max-w-screen-lg mx-auto flex items-center text-sm font-medium text-foreground-secondary',
					asLinks ? 'divide-x' : 'border-b',
					className
				)}
			>
				{!asLinks && setSelected
					? labels.map((label, i) => (
							<motion.button
								key={`tab_${i}`}
								animate
								onClick={() => setSelected(i)}
								className={cn(
									'relative px-5 pb-1 pt-2 hover:text-foreground transition-colors',
									i === selected && 'text-foreground'
								)}
							>
								{label}
								{i === selected && (
									<motion.div
										layoutId={`underline-${labels}`}
										className="w-full h-px absolute -bottom-px left-0 bg-foreground"
									/>
								)}
							</motion.button>
					  ))
					: labels.map((label, i) => (
							<Link
								key={`tab_${label}`}
								href={links ? links[i] : '/'}
								className={cn(
									'flex-1 p-6 hover:bg-foreground hover:text-background transition-colors',
									i === selected && 'text-background bg-foreground'
								)}
							>
								{label}
							</Link>
					  ))}
			</div>
		</LayoutGroup>
	);
}
