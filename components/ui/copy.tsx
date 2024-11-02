'use client';

import { cn } from '@/lib/utils';
import React, { useState } from 'react';

interface CopyProps {
	icon?: React.ReactNode;
	toCopy: string;
	successMessage: string | React.ReactNode;
	className?: string;
	children: React.ReactNode;
}

export default function Copy({ icon, toCopy, successMessage, className, children }: CopyProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(toCopy);
			setCopied(true);
			setTimeout(() => setCopied(false), 3000); // Reset state after 3 seconds
		} catch (error) {
			console.error('Failed to copy: ', error);
		}
	};

	return (
		<button
			onClick={handleCopy}
			className={cn(
				'relative overflow-hidden flex items-center gap-x-2 text-foreground-secondary text-sm hover:text-foreground font-[450] transition-colors hover:cursor-pointer',
				className
			)}
		>
			{icon}
			<span className={cn('transition-transform', copied && '-translate-y-5')}>{children}</span>
			<span
				className={cn(
					'translate-y-5 transition-transform absolute bottom-0',
					icon ? 'left-6' : 'left-0',
					copied && 'translate-y-0'
				)}
			>
				{successMessage}
			</span>
		</button>
	);
}
