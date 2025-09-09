import Callout from '@/components/blog/Callout';
import Code from '@/components/blog/Code';
import CustomImage from '@/components/blog/Image';
import CustomLink from '@/components/blog/Link';
import Tabs from '@/components/blog/Tabs';

import { slugify } from '@/lib/utils';
import React from 'react';

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

const MDXComponents = {
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
	Tabs: Tabs,
};
export default MDXComponents;
