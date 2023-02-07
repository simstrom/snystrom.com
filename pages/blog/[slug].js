import cn from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import readingTime from 'reading-time';
import { client } from '../../lib/contentful-server';
import { formatDate } from '../../lib/formatDate';

import Container from '../../components/Container';
import { LeftArrowIcon, LikeIcon } from '../../components/Icons';

export default function Article({ article }) {
	const [liked, setLiked] = useState(false);
	const [likes, setLikes] = useState(80);

	const handleLike = () => {
		if (!liked) {
			setLikes((prev) => prev + 1);
			setLiked(true);
			// Save to db.
		}
	};

	return (
		<Container>
			<article className="flex flex-col gap-12 mt-12">
				<div className="flex flex-col gap-1 animate-in">
					<span className="text-secondary font-medium text-sm tracking-widest uppercase">
						{article.fields.category}
					</span>
					<h1 className="text-3xl sm:text-4xl leading-normal">{article.fields.title}</h1>
					<div className="flex flex-col sm:flex-row justify-between gap-1 sm:items-center text-sm text-secondary font-medium">
						<p>{formatDate(article.sys.updatedAt)}</p>
						<div className="text-brand">
							<p className="inline">{article.fields.readingTime}</p>
							<span> • </span>
							<p className="inline">234 views</p>
							<span> • </span>
							<p className="inline">{likes} likes</p>
						</div>
					</div>
				</div>
				<div className="text-base text-tertiary animate-in animation-delay-1">
					<p>{article.fields.body}</p>
				</div>
				<div className="flex gap-2 items-center">
					<button
						className={cn(
							'rounded-lg p-2 hover:text-brand hover:bg-tertiary dark:hover:bg-tertiary/40 duration-300',
							liked ? 'text-brand' : 'text-tertiary'
						)}
						onClick={handleLike}
					>
						<LikeIcon filled={liked && true} />
					</button>
					<span className="font-medium">{likes}</span>
				</div>
				<Link
					href="/blog"
					className="flex gap-2 text-sm font-medium text-tertiary group hover:text-brand duration-300"
				>
					<div className="group-hover:-translate-x-1 transition-transform">
						<LeftArrowIcon />
					</div>
					<span>Back to All Posts</span>
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
	// Convert to MDX here...
	// Fetch views here...
	// Fetch likes here...

	return {
		props: {
			article,
		},
		revalidate: 30,
	};
}
