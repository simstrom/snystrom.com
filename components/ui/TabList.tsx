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
					'max-w-5xl mx-auto flex gap-x-1 items-center text-sm font-medium tracking-normal text-foreground-secondary',
					!asLinks && 'border-b',
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
								aria-current={i === selected ? 'page' : undefined}
								className={cn(
									i === selected
										? 'border-brand text-brand'
										: 'border-transparent text-foreground-tertiary transition-colors hover:border-foreground hover:text-foreground',
									'whitespace-nowrap border-b p-2 pt-4'
								)}
							>
								{label}
							</Link>
					  ))}
			</div>
		</LayoutGroup>
	);
}
