import { defineCollection, defineConfig } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';
import { readFileSync } from 'fs';
import { getPlaiceholder } from 'plaiceholder';
import readingTime from 'reading-time';
import rehypePrettyCode from 'rehype-pretty-code';
import { rehypeCodeOptions } from './lib/rehype';

const POSTS_ASSETS_DIR = '/assets/blog';
const POSTS_DIR = 'content/blog';

const posts = defineCollection({
	name: 'posts',
	directory: POSTS_DIR,
	include: '**/*.mdx',
	schema: (z) => ({
		title: z.string(),
		summary: z.string(),
		date: z.string(),
		image: z.string().optional(),
		tags: z.array(z.string()),
	}),
	transform: async (page, context) => {
		const body = await context.cache(page.content, async () =>
			compileMDX(context, page, {
				rehypePlugins: [[rehypePrettyCode, rehypeCodeOptions]],
			})
		);

		const blur = await context.cache(page._meta.path, async () => {
			if (!page.image) return null;
			const buffer = readFileSync(`./public${POSTS_ASSETS_DIR}/${page.image}`);
			const { base64 } = await getPlaiceholder(buffer);
			return base64;
		});

		return {
			...page,
			body,
			date: new Date(page.date),
			slug: page._meta.path,
			readingTime: readingTime(page.content).text,
			image: page.image ? `${POSTS_ASSETS_DIR}/${page.image}` : undefined,
			imageBlur: blur,
		};
	},
});

export default defineConfig({
	collections: [posts],
});
