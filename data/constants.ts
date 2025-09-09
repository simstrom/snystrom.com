export const isProduction = process.env.NODE_ENV === 'production';

export const SITE_URL = isProduction ? 'https://snystrom.com' : 'http://localhost:3000';

export const SITE_NAME = 'Simon Nyström';
export const SITE_TITLE = 'Simon Nyström | Web developer and Photographer';
export const SITE_DESCRIPTION =
	'Frontend engineer with a passion for UI/UX design and photography.';
export const SITE_KEYWORDS = [
	'simstrom',
	'simon nyström',
	'frontend',
	'web developer',
	'ui design',
	'adventure photography',
];

export const SITE_CONTACT = 'simons.nystrom@gmail.com';
export const SITE_GITHUB_URL = 'https://github.com/simstrom';
export const SITE_INSTAGRAM_URL = 'https://www.instagram.com/simonnystrom';
export const SITE_LINKEDIN_URL = 'https://linkedin.com/in/simon-nystrom';
