'use client';

import { IconSearch } from '@/lib/icons';
import { Interactions, Post } from '@/lib/types';
import { useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { AuroraBackground } from '@/components/ui/aurora';
import { motion } from 'framer-motion';
import PostList from '../postList';

type PostViewProps = {
	posts: Post[];
	views: Interactions;
};

export default function PostView({ posts, views }: PostViewProps) {
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
		<>
			<section className="grid grid-cols-12 gap-4 h-[calc(100vh/1.75)]">
				<div className="col-span-8 rounded-3xl bg-slate-50 w-full h-full"></div>
				<div className="col-span-4 w-full h-full flex flex-col gap-4">
					<div className="flex-1 rounded-3xl bg-slate-50"></div>
					{/* <div className="flex-1 rounded-3xl bg-slate-50"></div> */}
					<AuroraBackground showRadialGradient={true} className="border flex-1 rounded-3xl">
						Testing
					</AuroraBackground>
				</div>
			</section>
			<section className="max-w-2xl mx-auto min-h-[450px]">
				<div className="relative mb-8 flex items-center">
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
						<div className="hidden sm:block absolute text-foreground-secondary text-xs right-12">
							Found {filteredPosts.length} matching results
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
		</>
	);
}
