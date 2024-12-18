'use client';

import { Post } from '@/.content-collections/generated';
import { formatDate } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

type PostListProps = {
	posts: Post[];
	query?: string;
};

const determineMatch = (post: Post, query: string): string => {
	const { title, tags } = post;

	const matchingTag = tags?.find((tag) => tag.toLowerCase().includes(query.toLowerCase()));
	if (matchingTag) {
		return matchingTag;
	}
	if (title.toLowerCase().includes(query.toLowerCase())) {
		return 'Title';
	}
	return '';
};

export default function PostList({ posts, query }: PostListProps) {
	return (
		<motion.ul
			key="posts-view"
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				type: 'spring',
				stiffness: 300,
				damping: 30,
			}}
			className="flex flex-col opacity-list"
		>
			<AnimatePresence>
				{posts.map((post) => (
					<motion.li
						key={post.slug}
						layout
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<Link
							draggable="false"
							className="flex flex-col items-baseline gap-x-8 sm:flex-row py-5 group transition rounded-xl"
							href={`/blog/${post.slug}`}
						>
							<div className="w-full sm:w-fit min-w-fit flex items-baseline gap-x-2 sm:block text-sm text-foreground-secondary ">
								<time>{formatDate(post.date, true)}</time>
								<span className="sm:hidden">·</span>
								<span className="sm:hidden min-w-fit">{post.readingTime}</span>
								{query && (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ duration: 0.15 }}
										className="ml-auto text-xs text-brand"
									>
										{determineMatch(post, query)}
									</motion.div>
								)}
							</div>

							<div>
								<h3 className="transition-colors text-pretty grow">{post.title}</h3>
								<p className="text-sm text-foreground/50 line-clamp-2">{post.summary}</p>
							</div>

							<span className="hidden sm:block text-sm text-foreground-secondary ml-auto text-right min-w-fit">
								{post.readingTime}
							</span>
						</Link>
					</motion.li>
				))}
			</AnimatePresence>
		</motion.ul>
	);
}
