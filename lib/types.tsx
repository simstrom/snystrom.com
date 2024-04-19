import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export type Project = {
	title: string;
	description: string;
	skills: Array<string>;
	githubLink: string;
	deployLink: string;
	image: string | StaticImport;
};
