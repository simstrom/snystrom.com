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
	console.log(`underline-${labels}`);
	return (
		<LayoutGroup>
			<div
				className={cn(
					'w-full border-b flex text-foreground-secondary text-sm font-medium',
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
									'relative px-5 py-2 hover:text-foreground transition',
									i === selected && 'text-foreground'
								)}
							>
								{label}
								{i === selected && (
									<motion.div
										layoutId={`underline-${labels}`}
										className="w-full h-0.5 absolute bottom-0 left-0 bg-foreground"
									/>
								)}
							</motion.button>
					  ))
					: labels.map((label, i) => (
							<Link
								key={`tab_${label}`}
								href={links ? links[i] : '/'}
								className={cn(
									'relative px-5 py-2 hover:text-foreground transition',
									i === selected && 'text-foreground'
								)}
							>
								{label}
								{i === selected && (
									<div className="w-full h-0.5 absolute bottom-0 left-0 bg-foreground" />
								)}
							</Link>
					  ))}
			</div>
		</LayoutGroup>
	);
}
