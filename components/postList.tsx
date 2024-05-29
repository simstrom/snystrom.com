'use client';

import { IconStar } from '@/lib/icons';
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
				duration: 0.5,
				ease: 'easeInOut',
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
							transition={{
								duration: 0.3,
								ease: 'easeInOut',
							}}
						>
							<Link
								className="flex flex-col w-full gap-2 py-4 px-2 rounded-xl hover:bg-brand/5 transition duration-300 ease-in-out group"
								href={`/blog/${post.slug}`}
							>
								<div className="flex w-full gap-x-4 items-center text-sm">
									<time className="text-foreground-secondary">
										{formatDate(post.data.publishedAt, false, true)}
									</time>

									<span className="text-brand font-bold">/</span>

									<ViewCounter
										className="text-foreground-secondary"
										views={views?.find((view) => view.slug === post.slug)?.views as number}
									/>
									{query && (
										<motion.div
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											className="hidden xs:inline-flex ml-auto w-fit items-center gap-x-1 font-mono text-xs tracking-tighter py-1 px-2 bg-brand-secondary/10 text-brand rounded-lg"
										>
											<IconStar width={14} height={14} />
											{determineMatch(post, query)}
										</motion.div>
									)}
								</div>
								<h3 className="text-lg group-hover:text-brand transition-colors text-pretty">
									{post.data.title}
								</h3>
								<p className="text-sm leading-7 text-foreground-secondary line-clamp-2">
									{post.data.summary}
								</p>
							</Link>
						</motion.li>
					))}
			</AnimatePresence>
		</motion.ul>
	);
}
