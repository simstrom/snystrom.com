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
			const source = fs.readFileSync(path.join(contentDirectory, file));
			const { data, content } = matter(source);
			const slug = path.basename(file, path.extname(file));

			return { slug, content, data } as Post;
		});
	return posts;
});

export const getRelatedPosts = (post: Post) => {
	const posts = getBlogPosts();
	const related = posts
		.filter((p) => p.slug !== post.slug)
		.filter((p) => p.data.tags?.some((tag: string) => post.data.tags?.includes(tag)))
		.slice(0, 3);
	return related;
};

export const getPostsByTag = (tag: string) => {
	const posts = getBlogPosts();
	const postsByTag = posts.filter((p) =>
		p.data.tags?.some((t: string) => tag.toLowerCase() === t.toLowerCase())
	);
	return postsByTag;
};

export const getBlogPost = (slug: string) => {
	const posts = getBlogPosts();
	return posts.find((post) => post.slug === slug);
};

export const getAllTags = () => {
	const posts = getBlogPosts();
	// Extract tags from each post and flatten (take 12)
	const tags = posts.flatMap((post) => post.data.tags ?? []);
	// Ensure uniqueness of tags with Set
	return Array.from(new Set(tags));
};
