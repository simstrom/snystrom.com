import { SITE_CONTACT, SITE_GITHUB_URL, SITE_INSTAGRAM_URL, SITE_LINKEDIN_URL } from './constants';
import {
	IconBriefcase,
	IconCity,
	IconCompass,
	IconEducation,
	IconEmail,
	IconGithub,
	IconGroup,
	IconInstagram,
	IconLinkedin,
	IconPerson,
	IconReact,
	IconRSS,
	IconSparkle,
} from './icons';
import { GalleryCollection, Navigation, Project } from './types';

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
		name: 'Blog',
		path: '/blog',
	},
	{
		name: 'Projects',
		path: '/projects',
	},
];
const exploreLinks = [
	{
		name: 'Gallery',
		path: '/gallery',
	},
	{
		name: 'Colophon',
		path: '/colophon',
	},
	{
		name: 'Activity',
		path: '/activity',
	},
	{
		name: 'Playground',
		path: '',
		upcoming: true,
	},
];
const connectLinks = [
	{
		name: 'Contact',
		path: `mailto:${SITE_CONTACT}`,
		icon: <IconEmail />,
	},
	{
		name: 'Resume',
		path: '/cv.pdf',
		icon: <IconPerson />,
	},
];
const socialLinks = [
	{
		name: 'Github',
		path: SITE_GITHUB_URL,
		icon: <IconGithub width={20} height={20} />,
	},
	{
		name: 'LinkedIn',
		path: SITE_LINKEDIN_URL,
		icon: <IconLinkedin width={20} height={20} />,
	},
	{
		name: 'Instagram',
		path: SITE_INSTAGRAM_URL,
		icon: <IconInstagram width={20} height={20} />,
	},
	{
		name: 'RSS',
		path: '/rss.xml',
		icon: <IconRSS width={20} height={20} />,
	},
];

export const navItems: Navigation = {
	navigationLinks,
	exploreLinks,
	connectLinks,
	socialLinks,
} as const;
export const links = [...navigationLinks, ...exploreLinks, connectLinks, ...socialLinks];

//
// SKILLS
//
export enum Skills {
	HTML = 'HTML',
	CSS = 'CSS',
	JS = 'JavaScript',
	TS = 'TypeScript',
	React = 'React',
	Next = 'Next.js',
	Node = 'Node',
	Git = 'Git',
	TW = 'Tailwind',
	Prisma = 'Prisma',
	Mongo = 'MongoDB',
	GraphQL = 'GraphQL',
	Express = 'Express',
	Postgres = 'Postgres',
	Supabase = 'Supabase',
	Java = 'Java',
	CSHARP = 'C#',
	NET = '.NET',
	Framer = 'Framer Motion',
	Contentful = 'Contentful',
	Optimizely = 'Optimizely',
}

//
// ABOUT
//
export const timelineData = [
	{
		date: '2023',
		title: 'Started working at Sopra',
		text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit tempora temporibus laborum delectus nisi.',
		icon: <IconBriefcase width={16} />,
	},
	{
		date: '2023',
		title: 'Moved to a new city',
		text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit tempora temporibus laborum delectus nisi.',
		icon: <IconCity width={16} />,
	},
	{
		date: '2023',
		title: 'Graduated university',
		text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit tempora temporibus laborum delectus nisi.',
		icon: <IconEducation width={16} />,
	},
	{
		date: '2023',
		title: 'Worked with my first client',
		text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit tempora temporibus laborum delectus nisi.',
		icon: <IconGroup width={16} />,
	},
	{
		date: '2022',
		title: 'Moved to Australia',
		text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit tempora temporibus laborum delectus nisi.',
		icon: <IconCompass width={16} />,
	},
	{
		date: '2022',
		title: 'Started learning Next.js',
		text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit tempora temporibus laborum delectus nisi.',
		icon: <IconReact width={16} />,
	},
	{
		date: '2020',
		title: 'Started a new job',
		text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit tempora temporibus laborum delectus nisi.',
		icon: <IconBriefcase width={16} />,
	},
	{
		date: '2020',
		title: 'First step into Web Development',
		text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit tempora temporibus laborum delectus nisi.',
		icon: <IconSparkle width={14} />,
	},
];

//
// PROJECTS
// Add from top.
//
export const projectsData = [
	{
		title: 'Loop Agile',
		description:
			'Web-based communications platform acting as a forum for signed in users. Built for the purpose to learn full-stack React development and design patterns. Used an ORM on the middle layer and a component library on front-end.',
		image: '/assets/projects/loop-agile.png',
		stack: [
			Skills.React,
			Skills.Node,
			Skills.Express,
			Skills.Postgres,
			'Chakra UI',
			'Sequelize ORM',
		],
		deployLink: 'https://loop-agile.vercel.app/',
		githubLink: 'https://github.com/simstrom/loop-agile',
	},
	{
		title: 'CampSpotter',
		description:
			'Collection of user-created campgrounds where others can find and review them. Built for the purpose to learn how to use dynamic templating and integrating a database to the front-end while utilizing APIs and third party packages.',
		image: '/assets/projects/camp-spotter.png',
		stack: [Skills.JS, Skills.Node, Skills.Express, Skills.Mongo, 'Mapbox API'],
		githubLink: 'https://github.com/simstrom/camp-spotter',
	},
	{
		title: 'Snystrom.com',
		description:
			'My Personal portfolio website that you are currently visiting. Created my own design system for a unique look. Built with dynamic content management to add projects and posts using headless CMS.',
		image: '/assets/projects/snystrom.png',
		stack: [Skills.Next, Skills.TS, Skills.TW, Skills.Supabase],
		deployLink: '/colophon',
		githubLink: 'https://github.com/simstrom/camp-spotter',
	},
	{
		title: 'Supertrivia',
		description:
			'One of my first projects with vanilla js. Randomized quiz based on the Open Trivia DB API. Built to learn the basics of the capabilities with js and how to manage the DOM.',
		image: '/assets/projects/supertrivia.png',
		stack: [Skills.JS, Skills.HTML, Skills.CSS],
		deployLink: 'https://supertrivia.netlify.app/',
		githubLink: 'https://github.com/simstrom/snystrom.com',
	},
	{
		title: 'Arcturus',
		description:
			'Arcade styled 2D space shooter game with unlimited levels and infinitely increasing difficulty. Has different enemy types and various power ups. Handles game saves locally to file. Built to solidify knowledge about object-oriented programming and learn to implement GUI for Java Apps.',
		image: '/assets/projects/arcturus.png',
		stack: [Skills.Java, 'JavaFX', Skills.CSS],
		githubLink: 'https://github.com/simstrom/arcturus',
	},
] as Array<Project>;

//
// GALLERY: Destinations
//
export const galleryDestinations = [
	{
		title: 'Australia',
		description: 'string',
	},
	{
		title: 'Sweden',
		description: 'string',
	},
	// {
	// 	title: 'Norway',
	// 	description: 'string',
	// },
] as Array<GalleryCollection>;

//
// GALLERY: Collections
//
export const galleryCollections = [
	// {
	// 	title: 'Adventure',
	// 	description: 'string',
	// },
] as Array<GalleryCollection>;
