import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { getPlaiceholder } from 'plaiceholder';
import { cache } from 'react';
import readingTime from 'reading-time';
import { Post } from './types';

const contentDirectory = path.join(process.cwd(), 'content/blog');

const getImageBlur = async (src: string): Promise<string | undefined> => {
	try {
		const buffer = fs.readFileSync(path.join('public', src));
		const { base64 } = await getPlaiceholder(buffer);
		return base64;
	} catch (error) {
		console.error(`Error generating blur for image: ${src}`, error);
		return undefined;
	}
};

const processPost = async (file: string): Promise<Post> => {
	const source = fs.readFileSync(path.join(contentDirectory, file), 'utf-8');
	const slug = path.basename(file, path.extname(file));
	const { content, data } = matter(source);

	const imageBlur = data.image ? await getImageBlur(data.image) : undefined;

	return {
		slug,
		title: data.title,
		summary: data.summary,
		date: new Date(data.date),
		tags: data.tags,
		readingTime: readingTime(content).text,
		body: content,
		image: data.image,
		imageBlur,
	};
};

export const getBlogPosts = cache(async (): Promise<Post[]> => {
	const files = fs.readdirSync(contentDirectory);
	const posts = await Promise.all(
		files
			.filter((file) => path.extname(file) === '.mdx')
			.map(async (file) => await processPost(file))
	);

	return posts;
});

export const getLatestBlogPost = async () => {
	const posts = await getBlogPosts();
	if (!posts) return null;
	return posts[0];
};

export const getRelatedPosts = async (post: Post) => {
	const posts = await getBlogPosts();
	const related = posts
		.filter((p) => p.slug !== post.slug)
		.filter((p) => p.tags?.some((tag: string) => post.tags?.includes(tag)))
		.slice(0, 3);
	return related;
};

export const getPostsByTag = async (tag: string) => {
	const posts = await getBlogPosts();
	const postsByTag = posts.filter((p) =>
		p.tags?.some((t: string) => tag.toLowerCase() === t.toLowerCase())
	);
	return postsByTag;
};

export const getBlogPost = async (slug: string) => {
	const posts = await getBlogPosts();
	return posts.find((post) => post.slug === slug);
};

export const getAllTags = async () => {
	const posts = await getBlogPosts();
	// Extract tags from each post and flatten (take 12)
	const tags = posts.flatMap((post) => post.tags ?? []);
	// Ensure uniqueness of tags with Set
	return Array.from(new Set(tags));
};
