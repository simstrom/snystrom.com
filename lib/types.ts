import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export type Project = {
	title: string;
	description: string;
	skills: Array<string>;
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
		updatedAt?: string;
		summary?: string;
		tags?: string[];
		image?: string | StaticImport;
	};
};

export type Interactions =
	| {
			slug: string;
			views: number;
	  }[]
	| null;

export type Gallery = {
	title: string;
	slug: string;
	description: string;
	cover: string | StaticImport;
	images: Array<string | StaticImport>;
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
