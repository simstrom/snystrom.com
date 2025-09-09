'use client';

import { Post } from '@/.content-collections/generated';
import PostList from '@/components/ui/PostList';
import { IconRSS, IconSearch } from '@/data/icons';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';

type PostViewSearchProps = {
	posts: Post[];
};

export default function PostViewSearch({ posts }: PostViewSearchProps) {
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [debouncedQuery] = useDebounce(searchQuery, 500);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	const filteredPosts = useMemo(() => {
		return posts.filter(
			(post) =>
				post.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
				post.tags?.some((tag) => tag.toLowerCase().includes(debouncedQuery.toLowerCase()))
		);
	}, [posts, debouncedQuery]);

	return (
		<div>
			<div className="flex items-baseline justify-between px-6 pt-10 pb-4">
				<h3 className="text-3xl">All Articles</h3>
				{posts.length !== 0 && (
					<Link
						href="/rss.xml"
						className="flex gap-x-1 items-center w-fit text-sm font-medium px-4 py-2 text-foreground-secondary hover:text-background hover:bg-foreground transition-colors"
					>
						<IconRSS className="mr-1" />
						RSS
					</Link>
				)}
			</div>
			<div className="relative flex items-center border-y">
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
					className="w-full text-sm bg-background-secondary py-4 pl-12 pr-4 placeholder:text-foreground-secondary outline-none"
					value={searchQuery}
					onChange={handleSearch}
				/>
				{debouncedQuery && (
					<div className="hidden sm:block absolute text-foreground-secondary text-xs right-12">
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
						type: 'spring',
						stiffness: 300,
						damping: 30,
					}}
					className="text-center space-y-2 pt-10"
				>
					<p>Sorry, nothing to read here yet...</p>
					<p className="text-sm text-foreground-secondary">
						I just finished the site. Content will soon follow.
					</p>
					{/* <p>I have not written about that yet!</p>
							<p className="text-sm text-foreground-secondary">Try searching for something else</p> */}
				</motion.div>
			) : (
				<PostList posts={filteredPosts} query={debouncedQuery} />
			)}
		</div>
	);
}
