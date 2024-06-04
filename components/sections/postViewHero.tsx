import { AuroraBackground } from '@/components/ui/aurora';
import { IconArrowUpRight, IconFire, IconSparkle } from '@/lib/icons';
import { Post, Views } from '@/lib/types';
import { cn, formatDate } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import readingTime from 'reading-time';
import Tag from '../blog/tag';
import CursorGlow from '../ui/cursorGlow';
import ViewCounter from '../ui/viewCounter';

type PostViewHeroProps = {
	posts: Post[];
	views: Views;
	uniqueTags: string[];
	showTags?: boolean;
};

const getLatestPost = (posts: Post[]) => {
	return posts.slice().sort((a, b) => {
		const dateA = new Date(a.data.publishedAt);
		const dateB = new Date(b.data.publishedAt);
		return dateB.getTime() - dateA.getTime();
	})[0];
};

const getPopularPost = (
	posts: Post[],
	views: Views
): { popularPost: { post: Post | undefined; views: number } } => {
	const popularPostViewData = views?.reduce((prevPost, currPost) => {
		return currPost.views > prevPost.views ? currPost : prevPost;
	});
	const popularPostData = posts.find((post) => post.slug === popularPostViewData?.slug);
	return { popularPost: { post: popularPostData, views: popularPostViewData?.views ?? 0 } };
};

export default function PostViewHero({
	posts,
	views,
	uniqueTags,
	showTags = true,
}: PostViewHeroProps) {
	const latestPost = getLatestPost(posts);
	const { popularPost } = getPopularPost(posts, views);

	return (
		<section key="blog-hero" className="grid grid-cols-12 gap-2 sm:gap-4 h-[540px] animate-slide">
			<div className="hidden md:block col-span-8">
				<BlogFeaturedCard post={latestPost} views={views} type="recent" />
			</div>
			{!showTags && (
				<div className="md:hidden col-span-12">
					<BlogCard
						post={latestPost}
						views={views?.find((view) => view.slug === latestPost.slug)?.views as number}
						type="recent"
					/>
				</div>
			)}
			<div className="col-span-12 md:col-span-4 w-full h-full flex flex-col gap-4">
				<BlogCard post={popularPost.post} views={popularPost.views} type="popular" />
				<TagsCard uniqueTags={uniqueTags} className={cn(!showTags && 'hidden md:flex')} />
			</div>
		</section>
	);
}

const BlogFeaturedCard: React.FC<{ post: Post; views: Views; type: 'popular' | 'recent' }> = ({
	post,
	views,
	type,
}) => {
	return (
		<Link href={`/blog/${post.slug}`} className="rounded-3xl relative cursor-none">
			<CursorGlow
				containerClass="rounded-3xl p-5 flex flex-col"
				cursorClass="bg-brand-secondary/80 dark:bg-brand/80 rounded-full text-foreground-inverse dark:text-foreground"
				cursorElement={<IconArrowUpRight className="w-6 h-6" />}
			>
				<CardLabel type={type} />
				<div className="mt-auto w-fit z-10">
					<div className="rounded-t-xl inline-flex gap-x-4 py-1 pt-2 px-6 font-mono tracking-tight text-xs bg-background">
						{post.data.tags?.map((tag) => (
							<div key={tag} className="inline-flex gap-1 items-center w-fit">
								<span className="text-brand">#</span>
								{tag.toLowerCase()}
							</div>
						))}
					</div>
					<h2 className="whitespace-pre-wrap text-2xl xl:text-2xl">
						<span className="bg-background leading-snug py-2 rounded-xl px-5 rounded-tl-none rounded-bl-none box-decoration-clone ">
							{post.data.title}
						</span>
					</h2>
					<div className="rounded-b-xl inline-flex gap-x-4 py-2 px-6 text-sm bg-background">
						{formatDate(post.data.publishedAt, false, true)}
						<span className="text-brand">/</span>
						<ViewCounter views={views?.find((view) => view.slug === post.slug)?.views as number} />
					</div>
				</div>
				<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
				<Image
					src={post.data.image ?? '/images/webpic.png'}
					alt=""
					fill
					priority
					className="w-full h-full object-cover object-right-bottom -z-10 rounded-3xl border border-black dark:border-border/20"
				/>
			</CursorGlow>
		</Link>
	);
};

const BlogCard: React.FC<{ post: Post | undefined; views: number; type: 'popular' | 'recent' }> = ({
	post,
	views,
	type,
}) => {
	return (
		<Link href={`/blog/${post?.slug}`} className="flex-1 h-3/5 relative cursor-none rounded-3xl">
			<CursorGlow
				containerClass="rounded-3xl p-3 sm:p-5 flex flex-col"
				cursorClass="bg-brand-secondary/80 dark:bg-brand/80 rounded-full text-foreground-inverse dark:text-foreground"
				cursorElement={<IconArrowUpRight className="w-6 h-6" />}
			>
				<CardLabel type={type} />
				<div className="mt-auto text-foreground-inverse dark:text-foreground z-10">
					<div className="text-sm inline-flex gap-x-1 w-full">
						{readingTime(post?.content as string).text}
						<span className="text-brand">/</span>
						<ViewCounter views={views} />
					</div>
					<h2 className="text-lg">{post?.data.title}</h2>
				</div>
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 from-20% to-black/10" />
				<Image
					src={post?.data.image ?? '/images/webpic.png'}
					alt=""
					fill
					priority
					className="w-full h-full object-cover object-right-bottom -z-10 rounded-3xl border border-black dark:border-border/20"
				/>
			</CursorGlow>
		</Link>
	);
};

const TagsCard: React.FC<{ uniqueTags: string[]; className: string }> = ({
	uniqueTags,
	className,
}) => {
	return (
		<AuroraBackground
			showRadialGradient={true}
			className={cn(
				'border h-2/5 justify-center rounded-3xl p-3 sm:p-5 flex flex-col overflow-y-hidden',
				className
			)}
		>
			<h4 className="text-xs font-mono tracking-wide uppercase text-foreground-secondary font-medium px-2">
				Browse By Topic
			</h4>
			<h2 className="text-lg mb-2 md:mb-3 px-2">A taste of my interests</h2>
			<div className="justify-self-end flex flex-wrap gap-1">
				{uniqueTags.slice(0, 12).map((tag, idx) => (
					<Tag key={idx} tag={tag} />
				))}
			</div>
		</AuroraBackground>
	);
};

const CardLabel: React.FC<{ type: 'popular' | 'recent'; className?: string }> = ({
	type,
	className,
}) => {
	const icon =
		type == 'popular' ? (
			<IconFire width={15} height={15} className="text-foreground-secondary -translate-y-[1px]" />
		) : (
			<IconSparkle
				width={15}
				height={15}
				className="text-foreground-secondary -translate-y-[1px]"
			/>
		);
	const label = type == 'recent' ? 'Most Recent' : 'Popular';

	return (
		<div className="inline-flex items-center gap-x-2 px-4 py-3 rounded-full bg-background w-fit self-end font-mono text-xs uppercase tracking-wide z-10">
			{icon}
			{label}
		</div>
	);
};
