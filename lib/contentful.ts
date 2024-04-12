import { createClient } from 'contentful';

export const client = createClient({
	space: process.env.CONTENTFUL_SPACE_ID || '',
	accessToken: process.env.DEV
		? process.env.CONTENTFUL_PREVIEW_TOKEN || ''
		: process.env.CONTENTFUL_DELIVERY_TOKEN || '',
	host: process.env.DEV ? 'preview.contentful.com' : 'cdn.contentful.com',
});
