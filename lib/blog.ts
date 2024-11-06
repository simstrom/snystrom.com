import { allPosts, Post } from 'content-collections';
import { cache } from 'react';

export const getBlogPosts = cache(() => {
	const posts = allPosts.toSorted((a, b) => b.date.getTime() - a.date.getTime());
	return posts;
});

export const getLatestBlogPost = () => {
	const posts = getBlogPosts();

	if (!posts) return null;
	return posts[0];
};

export const getRelatedPosts = (post: Post) => {
	const posts = getBlogPosts();
	const related = posts
		.filter((p) => p.slug !== post.slug)
		.filter((p) => p.tags?.some((tag: string) => post.tags?.includes(tag)))
		.slice(0, 3);
	return related;
};

export const getPostsByTag = (tag: string) => {
	const posts = getBlogPosts();
	const postsByTag = posts.filter((p) =>
		p.tags?.some((t: string) => tag.toLowerCase() === t.toLowerCase())
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
	const tags = posts.flatMap((post) => post.tags ?? []);
	// Ensure uniqueness of tags with Set
	return Array.from(new Set(tags));
};
