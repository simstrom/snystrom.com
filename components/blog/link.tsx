import { IconArrowUpRight } from '@/lib/icons';
import Link from 'next/link';
import React from 'react';

interface CustomLinkProps
	extends React.DetailedHTMLProps<
		React.AnchorHTMLAttributes<HTMLAnchorElement>,
		HTMLAnchorElement
	> {}

export default function CustomLink(props: CustomLinkProps) {
	const href = props?.href as string;

	if (href.startsWith('/')) {
		return (
			<Link href={href} {...props} className="c-link">
				{props.children}
			</Link>
		);
	}
	if (href.startsWith('#')) {
		return <a {...props}>{props.children}</a>;
	}
	return (
		<a target="_blank" rel="noopener noreferrer" className="c-link group" {...props}>
			{props.children}
			<span className="overflow-hidden relative py-2">
				<IconArrowUpRight className="w-4 h-4 group-hover:-translate-y-5 group-hover:translate-x-5 transition" />
				<IconArrowUpRight className="absolute bottom-2 right-0  w-4 h-4 translate-y-5 -translate-x-5 group-hover:translate-y-0 group-hover:translate-x-0 transition" />
			</span>
		</a>
	);
}
