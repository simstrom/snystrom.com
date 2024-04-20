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
			<Link href={href} {...props}>
				{props.children}
			</Link>
		);
	}
	if (href.startsWith('#')) {
		return <a {...props}>{props.children}</a>;
	}
	return <a target="_blank" rel="noopener noreferrer" {...props} />;
}
