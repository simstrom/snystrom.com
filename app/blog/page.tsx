import { Metadata } from 'next';

import PostViewSearch from '@/components/sections/postViewSearch';
import AnimatedBadge from '@/components/ui/animatedBadge';
import PageHeader from '@/components/ui/pageHeader';
import { getBlogPosts } from '@/lib/blog';
import { IconArrowRight, IconSparkle } from '@/lib/icons';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Blog',
	description:
		'Discover my thoughts, insights and learnings on software development, design and beyond.',
};

export default async function Blog() {
	const posts = getBlogPosts();
	const featured = posts.find((p) => p.image !== undefined && p.imageMeta !== null);

	return (
		<main className="grow flex flex-col pt-32 sm:pt-40">
			<PageHeader
				title="Read My Blog"
				content="This is where I share my thoughts and experiences on all things code and design."
			/>

			{featured?.image && featured.imageMeta && (
				<Link
					href={`/blog/${featured.slug}`}
					className="mt-8 sm:mt-12 hidden sm:grid grid-cols-2 gap-5 md:gap-10 items-center group"
				>
					<div className="grid-cols-1 space-y-2">
						<AnimatedBadge
							containerClassName="mx-0 py-0.5 mb-4"
							className="text-foreground/90"
							as="div"
						>
							<IconSparkle
								width={16}
								height={16}
								className="text-brand min-w-[16px] min-h-[16px]"
							/>
							<span>Featured</span>
						</AnimatedBadge>
						<h3 className="text-2xl">{featured.title}</h3>
						<p className="text-[15px] text-foreground/80 line-clamp-3">{featured.summary}</p>
						<div className="pt-2 text-sm flex items-center gap-2 text-foreground-secondary">
							<span>{formatDate(featured.date)}</span>
							<span>·</span>
							<span>{featured.readingTime}</span>
							<div className="ml-2 transition group-hover:text-brand group-focus-visible:text-brand">
								<IconArrowRight />
							</div>
						</div>
					</div>
					<div className="relative overflow-hidden rounded-lg border">
						<Image
							priority
							src={featured.image}
							alt={`${featured.title} post image`}
							width={featured.imageMeta.width}
							height={featured.imageMeta.height}
							placeholder="blur"
							blurDataURL={featured.imageMeta.blur}
							draggable={false}
							className="w-full h-fit md:aspect-[3/2] rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
						/>
						<div
							className="z-10 absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-300 opacity-20 dark:opacity-50 group-hover:opacity-0"
							style={{
								background:
									'radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 200%)',
							}}
						></div>
					</div>
				</Link>
			)}

			<div className="pt-8 sm:pt-12 space-y-12">
				<PostViewSearch posts={posts} />
			</div>
		</main>
	);
}
