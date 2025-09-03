'use client';

import { Post } from '@/.content-collections/generated';
import { IconArrowRight } from '@/lib/icons';
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
			className="opacity-list flex flex-col divide-y"
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
							className="relative flex flex-col items-baseline gap-x-16 sm:flex-row p-6 group transition-transform"
							href={`/blog/${post.slug}`}
						>
							<div className="w-full sm:w-fit min-w-fit flex items-baseline gap-x-2 sm:flex-col text-sm font-medium text-foreground-secondary">
								<time>{formatDate(post.date, true)}</time>
								<span className="">{post.readingTime}</span>
								<span className="sm:hidden">·</span>
							</div>

							<div className="flex-1">
								<h3 className="text-lg text-pretty grow mb-1">{post.title}</h3>
								<p className="text-sm text-foreground-secondary line-clamp-2 leading-normal">
									{post.summary}
								</p>
							</div>

							<div className="mt-auto">
								<IconArrowRight className="justify-self-end self-end w-6 h-6" />
							</div>

							{query && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.15 }}
									className="absolute top-6 right-6 text-xs text-brand tracking-normal"
								>
									{determineMatch(post, query)}
								</motion.div>
							)}

							{/* <span className="hidden sm:block text-sm font-medium text-foreground-secondary ml-auto text-right min-w-fit">
								{post.readingTime}
							</span> */}
						</Link>
					</motion.li>
				))}
			</AnimatePresence>
		</motion.ul>
	);
}
