import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export type Project = {
	title: string;
	description: string;
	stack: Array<string>;
	githubLink?: string;
	deployLink?: string;
	image?: string | StaticImport;
};

export type Post = {
	slug: string;
	content: string;
	data: {
		title: string;
		publishedAt: string;
		summary?: string;
		tags?: string[];
		image?: string | StaticImport;
	};
};

export type Views =
	| {
			slug: string;
			views: number;
	  }[]
	| null;

export type GalleryCollection = {
	title: string;
	description: string;
	type: 'destinations' | 'collections';
	cover: GalleryImage;
	images: Array<GalleryImage>;
};
export type GalleryImage = {
	src: string | StaticImport;
	alt: string;
};

export type NavItem = {
	name: string;
	path: string;
	icon?: React.ReactNode;
};
export type Navigation = {
	navigationLinks: NavItem[];
	socialLinks: NavItem[];
	otherLinks: NavItem[];
};
