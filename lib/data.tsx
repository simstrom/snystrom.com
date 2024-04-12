import { ReactNode } from 'react';
import { IconEmail, IconGithub, IconInstagram, IconLinkedin, IconPerson } from './icons';

//
// TYPES & INTERFACES
//
export interface NavItem {
	name: string;
	path: string;
	icon?: ReactNode;
}
export interface Navigation {
	navigation: NavItem[];
	socials: NavItem[];
	other: NavItem[];
}

//
// DATA
//
export const navItems: Navigation = {
	navigation: [
		{
			name: 'Home',
			path: '/',
		},
		{
			name: 'About',
			path: '/about',
		},
		{
			name: 'Projects',
			path: '/projects',
		},
		{
			name: 'Blog',
			path: '/blog',
		},
		{
			name: 'Colophon',
			path: '/colophon',
		},
	],
	socials: [
		{
			name: 'LinkedIn',
			path: '',
			icon: <IconLinkedin width={18} />,
		},
		{
			name: 'Github',
			path: '',
			icon: <IconGithub width={18} />,
		},
		{
			name: 'Instagram',
			path: '',
			icon: <IconInstagram width={18} />,
		},
	],
	other: [
		{
			name: 'Contact',
			path: 'mailto:simons.nystrom@gmail.com',
			icon: <IconEmail />,
		},
		{
			name: 'Read CV',
			path: '/static/cv.pdf',
			icon: <IconPerson />,
		},
	],
} as const;

export const skillsData = [
	'HTML',
	'CSS',
	'JavaScript',
	'TypeScript',
	'React',
	'Next.js',
	'Node',
	'Git',
	'Tailwind',
	'Prisma',
	'MongoDB',
	'GraphQL',
	'Express',
	'Postgres',
	'Java',
	'C#',
	'.NET',
	'Framer Motion',
	'Contentful',
	'Optimizely',
] as const;
