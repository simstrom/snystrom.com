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
	cover: GalleryImage;
};
export type GalleryImage = {
	id: string;
	src: string;
	blurData: string;
	width: number;
	height: number;
	alt?: string;
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
