import React from 'react';
import { highlight } from 'sugar-high';
import CustomImage from './blog/image';
import CustomLink from './blog/link';

function Code({ children, ...props }: any) {
	let codeHTML = highlight(children);
	return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

// Used to create id's from headings
function slugify(str: string) {
	return str
		.toString()
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(/&/g, '-and-') // Replace & with 'and'
		.replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
		.replace(/\-\-+/g, '-'); // Replace multiple - with single -
}

// Creates anchor links for all headings
const createHeading = (level: number) => {
	return ({ children }: any) => {
		let slug = slugify(children);
		return React.createElement(
			`h${level}`,
			{ id: slug },
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
};

const MDXComponents = {
	h1: createHeading(1),
	h2: createHeading(2),
	h3: createHeading(3),
	h4: createHeading(4),
	h5: createHeading(5),
	h6: createHeading(6),
	Image: CustomImage,
	a: CustomLink,
	code: Code,
	//Callout
};

export default MDXComponents;
