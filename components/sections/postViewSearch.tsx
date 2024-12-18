'use client';

import { IconRSS, IconSearch } from '@/lib/icons';
import { useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { Post } from '@/.content-collections/generated';
import { motion } from 'framer-motion';
import CustomLink from '../blog/link';
import PostList from '../postList';

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
		<section className="max-w-3xl mx-auto min-h-[450px]">
			<div className="flex items-baseline justify-between">
				<h3 className="text-2xl mb-5">All Articles</h3>
				{posts.length !== 0 && (
					<CustomLink
						href="/rss.xml"
						className="w-fit text-sm font-medium dark:font-[450] p-2 before:content-[] text-foreground/80 hover:text-foreground transition-colors"
					>
						<IconRSS className="mr-1" />
						RSS
					</CustomLink>
				)}
			</div>
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
					className="w-full text-sm text-tertiary border bg-background-tertiary py-4 pl-12 pr-4 rounded-xl placeholder:text-foreground-secondary focus:outline-none focus:ring-2 ring-brand ring-offset-2 ring-offset-background transition"
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
				<PostList posts={filteredPosts} query={debouncedQuery} />
			)}
		</section>
	);
}
