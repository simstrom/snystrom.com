import { slugify } from '@/lib/utils';
import { MDXComponents } from 'mdx/types';
import React from 'react';
import Callout from './callout';
import Code from './code';
import CustomImage from './image';
import CustomLink from './link';

// Creates anchor links for all headings
const createHeading = (level: number) => {
	const HeadingComponent = ({ children }: any) => {
		let slug = slugify(children);
		return React.createElement(
			`h${level}`,
			{ id: slug, className: 'scroll-mt-24' },
			[
				React.createElement('a', {
					href: `#${slug}`,
					key: `link-${slug}`,
					className: 'anchor',
				}),
			],
			children
		);
	};
	HeadingComponent.displayName = `Heading${level}`;
	return HeadingComponent;
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		h1: createHeading(1),
		h2: createHeading(2),
		h3: createHeading(3),
		h4: createHeading(4),
		h5: createHeading(5),
		h6: createHeading(6),
		a: CustomLink,
		figure: (props: any) => Code(props),
		Image: CustomImage,
		Callout: Callout,
		...components,
	};
}
