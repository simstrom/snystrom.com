export const dynamic = 'force-static';

import { getBlogPosts } from '@/lib/blog';
import { Feed } from 'feed';

const posts = getBlogPosts();
const feed = new Feed({
	title: 'Simon Nyström',
	description:
		'My writings on tutorials, technologies, personal development, and reflective insights.',
	id: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
	link: `${process.env.NEXT_PUBLIC_SITE_URL}`,
	language: 'en',
	copyright: 'All rights reserved 2024, Simon Nyström',
	author: {
		name: 'Simon Nyström',
		email: 'simons.nystrom@gmail.com',
	},
	feedLinks: {
		rss: `${process.env.NEXT_PUBLIC_SITE_URL}/rss.xml`,
	},
});

export async function GET() {
	try {
		posts.forEach((post) => {
			feed.addItem({
				title: post.title,
				id: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
				link: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
				description: post.summary,
				date: post.date,
			});
		});

		return new Response(feed.rss2(), {
			status: 200,
			headers: {
				'Content-type': 'text/xml; charset=utf-8',
			},
		});
	} catch (error) {
		console.error(error);
		return new Response('Error generating feed', { status: 500 });
	}
}
