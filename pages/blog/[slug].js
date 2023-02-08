import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Link from 'next/link';
import readingTime from 'reading-time';
import { client } from '../../lib/contentful-server';
import fetcher from '../../lib/fetcher';
import { formatDate } from '../../lib/formatDate';

import { useState } from 'react';
import Container from '../../components/Container';
import { LeftArrowIcon } from '../../components/Icons';
import LikeButton from '../../components/LikeButton';

export default function Article({ meta, content, interactions }) {
	const [likes, setLikes] = useState(!interactions ? 0 : interactions.likes || 0);
	const views = !interactions ? 0 : interactions.views || 0;

	return (
		<Container>
			<article className="flex flex-col gap-12 mt-12">
				<div className="flex flex-col gap-1 animate-in">
					<span className="text-secondary font-medium text-sm tracking-widest uppercase">
						{meta.fields.category}
					</span>
					<h1 className="text-3xl sm:text-4xl leading-normal">{meta.fields.title}</h1>
					<div className="flex flex-col sm:flex-row justify-between gap-1 sm:items-center text-sm text-secondary font-medium">
						<p>{formatDate(meta.sys.updatedAt)}</p>
						<div className="text-brand">
							<p className="inline">{meta.fields.readingTime}</p>
							<span> • </span>
							<p className="inline">{views} views</p>
							<span> • </span>
							<p className="inline">{likes} likes</p>
						</div>
					</div>
				</div>
				<div className="prose prose-p:text-base prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg dark:prose-code:bg-tertiary/60 animate-in animation-delay-1">
					<MDXRemote {...content} />
				</div>

				<LikeButton slug={meta.fields.slug} likes={likes} setLikes={setLikes} />

				<Link
					href="/blog"
					className="flex gap-2 text-sm font-medium text-tertiary group hover:text-brand duration-300"
				>
					<div className="group-hover:-translate-x-1 transition-transform">
						<LeftArrowIcon />
					</div>
					<span>Back to Blog</span>
				</Link>
			</article>
		</Container>
	);
}

// Statically generates all paths for blog posts during build time.
export async function getStaticPaths() {
	const data = await client.getEntries({
		content_type: 'article',
	});

	const paths = data.items.map((article) => ({
		params: { slug: article.fields.slug },
	}));

	return {
		paths,
		fallback: false,
	};
}

// Fetching blog post that matches slug
export async function getStaticProps({ params }) {
	const data = await client.getEntries({
		content_type: 'article',
		'fields.slug': params.slug,
	});
	const article = data.items[0];
	article.fields.readingTime = readingTime(article.fields.body).text;
	const content = await serialize(article.fields.body);

	const interactions = await fetcher(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/views/${params.slug}`
	);

	// Fetch likes here...

	return {
		props: {
			meta: article,
			content,
			interactions,
		},
	};
}
