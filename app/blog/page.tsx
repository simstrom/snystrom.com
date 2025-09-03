import { Metadata } from 'next';

import PostViewSearch from '@/components/sections/postViewSearch';
import PageHeader from '@/components/ui/pageHeader';
import { Section } from '@/components/ui/section';
import { getBlogPosts } from '@/lib/blog';
import { IconArrowRight, IconCalendar, IconHourglass } from '@/lib/icons';
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
		<main className="grow">
			<PageHeader
				title="Read My Blog"
				content="This is where I share my thoughts and experiences on all things code and design."
				className="pt-32 pb-12 bg-background-secondary"
			/>

			{featured?.image && featured.imageMeta && (
				<Section borderOrigin={'y'} className="pb-0">
					<Link href={`/blog/${featured.slug}`} className="flex divide-x group">
						<div className="relative flex-1 flex flex-col justify-center space-y-2 px-6 py-4 border-r transition-colors group-hover:bg-foreground group-hover:text-background">
							<h3 className="text-2xl">{featured.title}</h3>
							<p className="text-[15px] leading-7 line-clamp-3">{featured.summary}</p>
							<div className="pt-2 flex items-center gap-6 text-sm font-medium text-foreground-secondary transition-colors group-hover:text-background/70">
								<div className="flex items-center gap-x-2">
									<IconCalendar width={14} height={14} />
									<time>{formatDate(featured.date)}</time>
								</div>
								<div className="flex items-center gap-x-2">
									<IconHourglass width={14} height={14} />
									<p>{featured.readingTime}</p>
								</div>
							</div>

							<IconArrowRight height={30} width={30} className="absolute right-6 bottom-6" />
						</div>
						<div className="relative rounded-3xl ring-1 ring-border overflow-hidden">
							<Image
								priority
								src={featured.image}
								alt={`${featured.title} post image`}
								width={featured.imageMeta.width}
								height={featured.imageMeta.height}
								placeholder="blur"
								blurDataURL={featured.imageMeta.blur}
								draggable={false}
								className="w-full md:aspect-[3/2] object-cover"
							/>
							<div className="user-select-none pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-brand/50 via-brand/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
						</div>
					</Link>
				</Section>
			)}

			<Section borderOrigin={featured?.image && featured.imageMeta ? null : 't'} className="pb-0">
				<PostViewSearch posts={posts} />
			</Section>
		</main>
	);
}
