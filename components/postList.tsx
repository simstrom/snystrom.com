'use client';

import { Post, Views } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import ViewCounter from './ui/viewCounter';

type PostListProps = {
	posts: Post[];
	views: Views;
	query?: string;
};

const determineMatch = (post: Post, query: string): string => {
	const { title, summary, tags } = post.data;

	if (title.toLowerCase().includes(query.toLowerCase())) {
		return 'Title match';
	}
	if (summary?.toLowerCase().includes(query.toLowerCase())) {
		return 'Content match';
	}
	const matchingTag = tags?.find((tag) => tag.toLowerCase().includes(query.toLowerCase()));
	if (matchingTag) {
		return `Topic: ${matchingTag}`;
	}
	return '';
};

export default function PostList({ posts, views, query }: PostListProps) {
	return (
		<motion.ul
			key="posts-view"
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.2,
			}}
			className="flex flex-col opacity-list"
		>
			<AnimatePresence>
				{posts
					.sort((a, b) => {
						if (new Date(a.data.publishedAt) > new Date(b.data.publishedAt)) {
							return -1;
						}
						return 1;
					})
					.map((post) => (
						<motion.li
							key={post.slug}
							layout
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							<Link
								className="flex flex-col p-5 rounded-lg transition group hover:bg-background-tertiary"
								href={`/blog/${post.slug}`}
							>
								<div className="flex w-full gap-x-2 items-center text-sm">
									<time className="text-foreground-secondary">
										{formatDate(post.data.publishedAt, false, true)}
									</time>
									<span className="text-foreground/30">/</span>
									<ViewCounter
										className="text-foreground-secondary"
										views={views?.find((view) => view.slug === post.slug)?.views as number}
									/>
									{query && (
										<motion.div
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											transition={{ duration: 0.2 }}
											className="hidden sm:block ml-auto text-xs text-brand"
										>
											{determineMatch(post, query)}
										</motion.div>
									)}
								</div>

								<h3 className="transition-colors text-pretty">{post.data.title}</h3>

								{/* <p className="text-sm leading-6 text-foreground-secondary line-clamp-2">
									{post.data.summary}
								</p> */}
							</Link>
						</motion.li>
					))}
			</AnimatePresence>
		</motion.ul>
	);
}
