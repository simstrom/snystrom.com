import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { cache } from 'react';
import { Post } from './types';

const contentDirectory = path.join(process.cwd(), 'content/blog');

export const getBlogPosts = cache(() => {
	const posts = fs
		.readdirSync(contentDirectory)
		.filter((file) => path.extname(file) === '.mdx')
		.map((file) => {
			const raw = fs.readFileSync(path.join(contentDirectory, file));
			const { data, content } = matter(raw);
			const slug = path.basename(file, path.extname(file));

			return { slug, content, data } as Post;
		});
	return posts;
});

export const getBlogPost = (slug: string) => {
	const posts = getBlogPosts();
	return posts.find((post) => post.slug === slug);
};
