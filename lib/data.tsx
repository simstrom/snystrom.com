import { IconEmail, IconGithub, IconInstagram, IconLinkedin, IconPerson } from './icons';
import { Navigation } from './types';

//
// NAVIGAITON
//
const navigationLinks = [
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
];
const otherLinks = [
	{
		name: 'Contact',
		path: 'mailto:simons.nystrom@gmail.com',
		icon: <IconEmail />,
	},
	{
		name: 'Read CV',
		path: '/cv.pdf',
		icon: <IconPerson />,
	},
];
const socialLinks = [
	{
		name: 'Github',
		path: 'https://github.com/simstrom',
		icon: <IconGithub width={18} />,
	},
	{
		name: 'LinkedIn',
		path: 'https://se.linkedin.com/in/simon-nystrom',
		icon: <IconLinkedin width={18} />,
	},
	{
		name: 'Instagram',
		path: 'https://www.instagram.com/simonnystrom/',
		icon: <IconInstagram width={18} />,
	},
];

export const navItems: Navigation = {
	navigationLinks,
	otherLinks,
	socialLinks,
} as const;
export const links = [...navigationLinks, ...otherLinks, ...socialLinks];

//
// SKILLS
//
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
