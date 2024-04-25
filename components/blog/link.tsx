import { IconExternal } from '@/lib/icons';
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
			<Link href={href} {...props} className="custom-link">
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
			className="custom-link inline-flex items-baseline gap-x-1"
			{...props}
		>
			{props.children}
			<IconExternal className="w-[15px] h-[15px]" />
		</a>
	);
}
