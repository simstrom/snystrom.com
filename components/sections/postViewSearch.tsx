'use client';

import { IconSearch } from '@/lib/icons';
import { Post, Views } from '@/lib/types';
import { useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { motion } from 'framer-motion';
import PostList from '../postList';

type PostViewSearchProps = {
	posts: Post[];
	views: Views;
};

export default function PostViewSearch({ posts, views }: PostViewSearchProps) {
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [debouncedQuery] = useDebounce(searchQuery, 500);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	const filteredPosts = useMemo(() => {
		return posts.filter(
			(post) =>
				post.data.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
				post.data.summary?.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
				post.data.tags?.some((tag) => tag.toLowerCase().includes(debouncedQuery.toLowerCase()))
		);
	}, [posts, debouncedQuery]);

	return (
		<section className="max-w-3xl mx-auto min-h-[450px]">
			<h3 className="text-2xl mb-5">All Articles</h3>
			<div className="relative mb-5 flex items-center">
				<label
					htmlFor="search"
					className="text-foreground-secondary absolute left-0 top-1/2 -translate-y-1/2 px-4"
				>
					<IconSearch />
				</label>
				<input
					id="search"
					name="search"
					type="search"
					autoComplete="off"
					placeholder="Search for articles or topics ..."
					className="w-full text-sm text-tertiary border bg-background-tertiary py-4 pl-12 pr-4 rounded-lg placeholder:text-foreground-secondary focus:outline-none focus:ring-2 ring-brand ring-offset-2 ring-offset-background transition duration-300"
					value={searchQuery}
					onChange={handleSearch}
				/>
				{debouncedQuery && (
					<div className="hidden sm:block absolute text-foreground-secondary font-mono tracking-tighter text-xs right-12">
						{filteredPosts.length} matching results
					</div>
				)}
			</div>

			{!filteredPosts.length ? (
				<motion.div
					key="no-result-view"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.5,
						ease: 'easeInOut',
					}}
					className="text-center space-y-2 pt-4"
				>
					<p>Sorry, nothing to read here yet...</p>
					<p className="text-sm text-foreground-secondary">
						I just finished the site. Content will soon follow.
					</p>
					{/* <p>I have not written about that yet!</p>
							<p className="text-sm text-foreground-secondary">Try searching for something else</p> */}
				</motion.div>
			) : (
				<PostList posts={filteredPosts} query={debouncedQuery} views={views} />
			)}
		</section>
	);
}
