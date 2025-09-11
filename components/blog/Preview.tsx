'use client';

import { cn } from '@/lib/utils';
import React from 'react';

interface PreviewProps {
	title?: string;
	children: React.ReactNode;
	className?: string;
}

export default function Preview({ title, className, children }: PreviewProps) {
	const resolvedTitle =
		title ?? (React.isValidElement(children) && (children.type as any)?.displayName);

	return (
		<div className="mt-8 text-sm bg-background-secondary rounded-xl border shadow-xs">
			{resolvedTitle && (
				<div className="flex space-x-4 px-6 py-2.5 border-b font-medium text-foreground">
					{resolvedTitle}
				</div>
			)}
			<div
				className={cn(
					'relative min-h-64 px-6 py-10 flex flex-col gap-8 items-center justify-center rounded-xl',
					'bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[length:25px_25px]',
					className
				)}
			>
				{children}

				<span className="absolute top-2 right-4 text-xs text-foreground/50">Preview</span>
			</div>
		</div>
	);
}
