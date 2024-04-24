'use client';

import { IconArrowUpRight, IconFire, IconSearch, IconSparkle } from '@/lib/icons';
import { Post, Views } from '@/lib/types';
import { useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { AuroraBackground } from '@/components/ui/aurora';
import { formatDate, slugify } from '@/lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';
import readingTime from 'reading-time';
import ViewCounter from '../blog/viewCounter';
import PostList from '../postList';
import CursorGlow from '../ui/cursorGlow';

type PostViewProps = {
	posts: Post[];
	views: Views;
	uniqueTags: string[];
};

const filterHeroPosts = (
	posts: Post[],
	views: Views
): { latestPost: Post; popularPost: { post: Post | undefined; views: number } } => {
	const latestPost = posts.slice().sort((a, b) => {
		const dateA = new Date(a.data.updatedAt ?? a.data.publishedAt);
		const dateB = new Date(b.data.updatedAt ?? b.data.publishedAt);
		return dateB.getTime() - dateA.getTime();
	})[0];

	const popularPostViewData = views?.reduce((prevPost, currPost) => {
		return currPost.views > prevPost.views ? currPost : prevPost;
	});
	const popularPostData = posts.find((post) => post.slug === popularPostViewData?.slug);

	return {
		latestPost,
		popularPost: { post: popularPostData, views: popularPostViewData?.views ?? 0 },
	};
};

export default function PostView({ posts, views, uniqueTags }: PostViewProps) {
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

	const { latestPost, popularPost } = filterHeroPosts(posts, views);

	return (
		<>
			<motion.section
				key="blog-hero"
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					duration: 0.5,
					ease: 'easeInOut',
				}}
				className="grid grid-cols-12 gap-4 h-[calc(100vh/1.6)]"
			>
				<div
					className="hidden md:block col-span-8 shadow-shadow rounded-3xl relative bg-right-bottom cursor-none"
					style={{ backgroundImage: `url(${latestPost.data.image ?? '/images/webpic.png'})` }}
				>
					<CursorGlow
						containerClass="rounded-3xl p-5 flex flex-col"
						cursorClass="bg-brand-secondary/80 dark:bg-brand/80 rounded-full text-foreground-inverse dark:text-foreground"
						cursorElement={<IconArrowUpRight className="w-6 h-6" />}
					>
						<div className="absolute -z-[1] inset-0 bg-gradient-to-t from-black/70 to-black/10 rounded-3xl" />
						<div className="inline-flex items-center gap-x-2 px-4 py-3 rounded-full bg-background w-fit self-end text-xs uppercase tracking-wider font-medium">
							<IconSparkle
								width={15}
								height={15}
								className="text-foreground-secondary -translate-y-[2px]"
							/>
							Most Recent
						</div>
						<div className="mt-auto w-fit">
							<div className="rounded-t-xl inline-flex gap-x-5 pb-1 pt-2 px-6 text-sm font-medium bg-background">
								{latestPost.data.tags?.map((tag) => (
									<div className="">
										<span className="text-brand"># </span>
										{tag}
									</div>
								))}
							</div>
							<h2 className="whitespace-pre-wrap xl:text-6xl lg:text-5xl md:text-4xl">
								<span className="bg-background leading-snug py-2 rounded-xl px-5 rounded-tl-none rounded-bl-none box-decoration-clone ">
									{latestPost.data.title}
								</span>
							</h2>
							<div className="rounded-b-xl inline-flex gap-x-4 pb-2 py-1 px-6 font-medium text-sm bg-background">
								{formatDate(latestPost.data.updatedAt ?? latestPost.data.publishedAt, false, true)}
								<span className="text-brand">/</span>
								<ViewCounter
									views={views?.find((view) => view.slug === latestPost.slug)?.views as number}
								/>
							</div>
						</div>
					</CursorGlow>
				</div>

				<div className="col-span-12 md:col-span-4 w-full h-full flex flex-col gap-4">
					<div
						className="flex-1 h-3/5 rounded-3xl relative shadow-shadow bg-cover cursor-none"
						style={{
							backgroundImage: `url(${popularPost.post?.data.image ?? '/images/webpic.png'})`,
						}}
					>
						<CursorGlow
							containerClass="rounded-3xl p-3 sm:p-5 flex flex-col"
							cursorClass="bg-brand-secondary/80 dark:bg-brand/80 rounded-full text-foreground-inverse dark:text-foreground"
							cursorElement={<IconArrowUpRight className="w-6 h-6" />}
						>
							<div className="absolute -z-[1] inset-0 bg-gradient-to-t from-black/80 from-20% to-black/10 rounded-3xl" />
							<div className="inline-flex items-center gap-x-2 px-4 py-3 rounded-full bg-background w-fit text-xs uppercase tracking-wider self-end font-medium">
								<IconFire width={14} height={14} className="text-foreground-secondary" />
								Popular
							</div>
							<div className="mt-auto text-foreground-inverse dark:text-foreground">
								<div className="font-medium text-sm inline-flex gap-x-1 w-full ">
									{readingTime(popularPost.post?.content as string).text}
									<span className="text-brand">/</span>
									<ViewCounter views={popularPost.views} />
								</div>
								<h2 className="text-xl sm:text-2xl">{popularPost.post?.data.title}</h2>
							</div>
						</CursorGlow>
					</div>
					{/* <div className="flex-1 rounded-3xl bg-slate-50"></div> */}
					<AuroraBackground
						showRadialGradient={true}
						className="border h-2/5 justify-center  rounded-3xl p-3 sm:p-5 flex flex-col shadow-shadow overflow-y-hidden"
					>
						<span className="text-sm tracking-wider uppercase text-foreground-secondary font-medium px-2">
							Browse By Topic
						</span>
						<h2 className="text-xl mb-2 md:mb-3 px-2">A taste of my interests</h2>
						<div className="justify-self-end flex flex-wrap gap-1">
							{uniqueTags.map((tag) => (
								<Link
									key={tag}
									href={`/blog/tag/${slugify(tag.toLowerCase())}`}
									className="text-center w-fit px-2 py-0.5 rounded-lg hover:bg-brand-secondary/10 hover:text-brand cursor-pointer transition duration-300 ease-in-out"
								>
									<span className="text-brand"># </span>
									{tag.toLowerCase()}
								</Link>
							))}
						</div>
					</AuroraBackground>
				</div>
			</motion.section>

			<section className=" max-w-2xl mx-auto min-h-[450px]">
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