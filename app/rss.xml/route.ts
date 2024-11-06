export const dynamic = 'force-static';

import { getBlogPosts } from '@/lib/blog';
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from '@/lib/constants';
import { Feed } from 'feed';

const feed = new Feed({
	title: SITE_TITLE,
	description: SITE_DESCRIPTION,
	link: SITE_URL,
	id: `${SITE_URL}/blog`,
	feed: `${SITE_URL}/rss.xml`,
	copyright: 'All rights reserved 2024, Simon Nyström',
	language: 'en',
	image: `${SITE_URL}/images/og.png`,
});

const posts = getBlogPosts();

export async function GET() {
	try {
		posts.forEach((post) => {
			feed.addItem({
				title: post.title,
				id: `${SITE_URL}/blog/${post.slug}`,
				link: `${SITE_URL}/blog/${post.slug}`,
				description: post.summary,
				date: post.date,
				author: [{ name: SITE_NAME }],
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
