import { Section } from '@/components/layouts/Section';
import BentoCards from '@/components/sections/BentoCards';
import Bento from '@/components/ui/Bento';

import { SITE_URL } from '@/data/constants';
import { projectsData } from '@/data/data';
import { IconArrowRight } from '@/data/icons';
import { getAllTags, getBlogPosts, getLatestBlogPost } from '@/lib/blog';
import { getAllImages } from '@/lib/gallery';
import { Project } from '@/lib/types';
import { cn, formatDate } from '@/lib/utils';

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	alternates: {
		canonical: SITE_URL,
	},
};

export default async function Home() {
	// const images = await getImagesByTag('Landing');
	const galleryImages = (await getAllImages(4)).images;
	const blogPosts = getBlogPosts();
	const allUniqueTags = getAllTags();
	const latestPost = getLatestBlogPost();
	const snystrom = projectsData.find((project) => project.title === 'Snystrom.com') as Project;

	return (
		<main className="grow flex flex-col items-center justify-center">
			<Section className="pt-32">
				<Bento.Grid>
					<BentoCards.About />
					<BentoCards.Gallery images={galleryImages} />
					<BentoCards.Projects />
					{latestPost && <BentoCards.Blog latestPost={latestPost} />}
				</Bento.Grid>
			</Section>

			<Section title="Latest Posts" subtitle="Blog" linkHref="/blog" showHeader>
				<div className="flex md:flex-row flex-col border-b">
					{blogPosts.slice(0, 3).map((post, idx) => (
						<Link
							key={post.slug}
							href={`/blog/${post.slug}`}
							className={cn('flex flex-col flex-1 group', idx !== 0 && 'border-l')}
						>
							<div className="px-6 py-6 flex gap-x-2 justify-between items-end transition-colors group-hover:bg-foreground group-hover:text-background">
								<h3 className="text-xl text-pretty">{post.title}</h3>
								<IconArrowRight
									width={30}
									height={30}
									className="group min-w-[30px] min-h-[30px]"
								/>
							</div>
							<div className="px-6 py-4 border-t">
								<p className="text-foreground leading-7">{post.summary}</p>
							</div>
							<div className="mt-auto border-t px-6 py-4 flex gap-x-2 items-center text-sm font-medium">
								<time className="text-foreground-secondary">{formatDate(post.date, true)}</time>
								<span className="text-foreground-tertiary">·</span>
								<p className="text-foreground-secondary">{post.readingTime}</p>
							</div>
						</Link>
					))}
				</div>
			</Section>
		</main>
	);
}
