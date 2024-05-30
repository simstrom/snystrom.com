import { AuroraBackground } from '@/components/ui/aurora';
import { IconArrowUpRight, IconFire, IconSparkle } from '@/lib/icons';
import { Post, Views } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import readingTime from 'reading-time';
import Tag from '../blog/tag';
import CursorGlow from '../ui/cursorGlow';
import ViewCounter from '../ui/viewCounter';

type PostViewHeroProps = {
	posts: Post[];
	views: Views;
	uniqueTags: string[];
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

export default function PostViewHero({ posts, views, uniqueTags }: PostViewHeroProps) {
	const latestPost = getLatestPost(posts);
	const { popularPost } = getPopularPost(posts, views);

	return (
		<section key="blog-hero" className="grid grid-cols-12 gap-4 h-[calc(100vh/1.6)] animate-slide">
			<RecentCard latestPost={latestPost} views={views} />
			<div className="col-span-12 md:col-span-4 w-full h-full flex flex-col gap-4">
				<PopularCard popularPost={popularPost} />
				<TagsCard uniqueTags={uniqueTags} />
			</div>
		</section>
	);
}

const RecentCard: React.FC<{ latestPost: Post; views: Views }> = ({ latestPost, views }) => {
	return (
		<Link
			href={`/blog/${latestPost.slug}`}
			className="hidden md:block col-span-8 shadow-shadow rounded-3xl relative bg-right-bottom cursor-none"
			style={{ backgroundImage: `url(${latestPost.data.image ?? '/images/webpic.png'})` }}
		>
			<CursorGlow
				containerClass="rounded-3xl p-5 flex flex-col"
				cursorClass="bg-brand-secondary/80 dark:bg-brand/80 rounded-full text-foreground-inverse dark:text-foreground"
				cursorElement={<IconArrowUpRight className="w-6 h-6" />}
			>
				<div className="inline-flex items-center gap-x-2 px-4 py-3 rounded-full bg-background w-fit self-end font-mono text-xs uppercase tracking-wide z-10">
					<IconSparkle
						width={15}
						height={15}
						className="text-foreground-secondary -translate-y-[2px]"
					/>
					Most Recent
				</div>
				<div className="mt-auto w-fit z-10">
					<div className="rounded-t-xl inline-flex gap-x-4 py-1 pt-2 px-6 font-mono tracking-tight text-xs bg-background">
						{latestPost.data.tags?.map((tag) => (
							<div key={tag} className="inline-flex gap-1 items-center w-fit">
								<span className="text-brand">#</span>
								{tag.toLowerCase()}
							</div>
						))}
					</div>
					<h2 className="whitespace-pre-wrap text-2xl xl:text-2xl">
						<span className="bg-background leading-snug py-2 rounded-xl px-5 rounded-tl-none rounded-bl-none box-decoration-clone ">
							{latestPost.data.title}
						</span>
					</h2>
					<div className="rounded-b-xl inline-flex gap-x-4 py-2 px-6 text-sm bg-background">
						{formatDate(latestPost.data.publishedAt, false, true)}
						<span className="text-brand">/</span>
						<ViewCounter
							views={views?.find((view) => view.slug === latestPost.slug)?.views as number}
						/>
					</div>
				</div>
				<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 rounded-3xl" />
			</CursorGlow>
		</Link>
	);
};

const PopularCard: React.FC<{ popularPost: { post: Post | undefined; views: number } }> = ({
	popularPost,
}) => {
	return (
		<Link
			href={`/blog/${popularPost.post?.slug}`}
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
				<div className="inline-flex items-center gap-x-2 px-4 py-3 rounded-full bg-background w-fit font-mono text-xs uppercase tracking-wide self-end font-medium z-10">
					<IconFire width={14} height={14} className="text-foreground-secondary" />
					Popular
				</div>
				<div className="mt-auto text-foreground-inverse dark:text-foreground z-10">
					<div className="text-sm inline-flex gap-x-1 w-full">
						{readingTime(popularPost.post?.content as string).text}
						<span className="text-brand">/</span>
						<ViewCounter views={popularPost.views} />
					</div>
					<h2 className="text-lg">{popularPost.post?.data.title}</h2>
				</div>
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 from-20% to-black/10 rounded-3xl" />
			</CursorGlow>
		</Link>
	);
};

const TagsCard: React.FC<{ uniqueTags: string[] }> = ({ uniqueTags }) => {
	return (
		<AuroraBackground
			showRadialGradient={true}
			className="border h-2/5 justify-center rounded-3xl p-3 sm:p-5 flex flex-col shadow-shadow overflow-y-hidden"
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
