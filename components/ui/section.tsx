import { IconArrowRight } from '@/lib/icons';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { ReactNode } from 'react';

interface SectionProps {
	title?: string;
	subtitle?: string;
	linkHref?: string;
	children: ReactNode;
	showHeader?: boolean;
	className?: string;
	borderOrigin?: 't' | 'b' | 'y' | null;
}

export const Section: React.FC<SectionProps> = ({
	title = 'Latest Posts',
	subtitle = 'Blog',
	linkHref = '/blog',
	children,
	showHeader = false,
	borderOrigin = 'b',
	className,
}) => (
	<section
		className={cn(
			'w-full',
			borderOrigin === 'y'
				? 'border-y'
				: borderOrigin === 'b'
				? 'border-b'
				: borderOrigin === 't'
				? 'border-t'
				: ''
		)}
	>
		{showHeader && (
			<div className="w-full border-b">
				<Link
					href={linkHref}
					className="max-w-5xl mx-auto flex flex-col bg-background-secondary group"
				>
					<div className="flex justify-between items-end p-6 transition-colors group-hover:bg-foreground group-hover:text-background">
						<div>
							<div className="ml-2 font-medium text-sm text-brand mb-1 transition-colors group-hover:text-background">
								{subtitle}
							</div>
							<h2 className="text-5xl">{title}</h2>
						</div>
						<IconArrowRight width={40} height={40} className="group" />
					</div>
				</Link>
			</div>
		)}
		<div className={cn('max-w-5xl mx-auto flex flex-col pb-20', className)}>{children}</div>
	</section>
);
