import { defineCollection, defineConfig } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';
import lqip from 'lqip-modern';
import readingTime from 'reading-time';
import rehypePrettyCode from 'rehype-pretty-code';
import { rehypeCodeOptions } from './lib/rehype';

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

		const imageMeta = await context.cache(page._meta.path, async () => {
			if (!page.image) return null;
			const result = await lqip(`./public${page.image}`);
			return {
				blur: result.metadata.dataURIBase64,
				width: result.metadata.originalWidth,
				height: result.metadata.originalHeight,
			};
		});

		return {
			...page,
			body,
			date: new Date(page.date),
			slug: page._meta.path,
			readingTime: readingTime(page.content).text,
			image: page.image ? page.image : undefined,
			imageMeta,
		};
	},
});

export default defineConfig({
	collections: [posts],
});
