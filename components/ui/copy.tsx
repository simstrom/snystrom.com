'use client';

import { cn } from '@/lib/utils';
import React, { useState } from 'react';

interface CopyProps {
	icon: React.ReactNode;
	toCopy: string;
	message: string;
	className: string;
}

export default function Copy({ icon, toCopy, message, className }: CopyProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(toCopy);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000); // Reset state after 2 seconds
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
			<span className={cn('transition-transform', copied && '-translate-y-5')}>{toCopy}</span>
			<span
				className={cn(
					'translate-y-5 transition-transform absolute left-6 bottom-0',
					copied && 'translate-y-0'
				)}
			>
				{message}
			</span>
		</button>
	);
}
