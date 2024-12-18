import { IconArrowUpRight } from '@/lib/icons';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

interface CustomLinkProps
	extends React.DetailedHTMLProps<
		React.AnchorHTMLAttributes<HTMLAnchorElement>,
		HTMLAnchorElement
	> {
	className?: string;
}

export default function CustomLink(props: CustomLinkProps) {
	const href = props?.href as string;

	if (href.startsWith('/')) {
		return (
			<Link {...props} href={href} className={cn('c-link', props.className)}>
				{props.children}
			</Link>
		);
	}
	if (href.startsWith('#')) {
		return <a {...props}>{props.children}</a>;
	}
	return (
		<a
			target="_blank"
			rel="noopener noreferrer"
			{...props}
			className={cn('c-link group', props.className)}
		>
			{props.children}
			<span className="overflow-hidden relative">
				<IconArrowUpRight className="w-4 h-4 group-hover:-translate-y-5 group-hover:translate-x-5 transition-transform" />
				<IconArrowUpRight className="absolute bottom-0 right-0  w-4 h-4 translate-y-5 -translate-x-5 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform" />
			</span>
		</a>
	);
}
