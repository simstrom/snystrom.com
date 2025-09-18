import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { ComponentType, SVGProps } from 'react';

export type Project = {
	title: string;
	description: string;
	stack: Array<string>;
	githubLink: string;
	deployLink?: string;
	image?: string | StaticImport;
};

export type GalleryCollection = {
	title: string;
	description: string;
	cover: GalleryImage;
	length: number;
};
export type GalleryImage = {
	id: string;
	src: string;
	blurData: string;
	width: number;
	height: number;
	alt?: string;
	tags: string[];
};

export type NavItem = {
	name: string;
	path: string;
	icon?: ComponentType<SVGProps<SVGSVGElement>>;
};
export type Navigation = {
	navigationLinks: NavItem[];
	exploreLinks: NavItem[];
	connectLinks: NavItem[];
	socialLinks: NavItem[];
};
