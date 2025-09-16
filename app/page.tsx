import { Section } from '@/components/layouts/Section';
import {
	BentoCardAbout,
	BentoCardBlog,
	BentoCardGallery,
	BentoCardProjects,
} from '@/components/sections/BentoCards';
import { BentoGrid } from '@/components/ui/Bento';
import { Card, CardBody, CardFooter } from '@/components/ui/Card';

import { SITE_URL } from '@/data/constants';
import { projectsData } from '@/data/data';
import { IconArrow, IconDocument } from '@/data/icons';
import { getAllTags, getBlogPosts, getLatestBlogPost } from '@/lib/blog';
import { getAllImages } from '@/lib/gallery';
import { Project } from '@/lib/types';
import { formatDate } from '@/lib/utils';

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
			<Section className="pt-32" borderOrigin={null}>
				<BentoGrid>
					<BentoCardAbout />
					<BentoCardGallery images={galleryImages} />
					<BentoCardProjects />
					{latestPost && <BentoCardBlog latestPost={latestPost} />}
				</BentoGrid>
			</Section>

			<section className="pb-20 w-full">
				<div className="relative text-center border-y mb-5 pb-1">
					<span className="text-sm font-medium text-brand">Blog</span>
					<h2 className="text-xl">Latest Blog Posts</h2>

					<Link
						href={'/blog'}
						className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full ring-1 ring-border text-foreground-secondary transition-all hover:text-brand hover:bg-brand/20 hover:ring-brand/20"
					>
						<IconArrow className="w-4 h-4" />
					</Link>
				</div>
				<div className="grid grid-cols-2 gap-x-4 px-4 border-y">
					{blogPosts.slice(0, 3).map((post, idx) => (
						<Card
							key={post.slug}
							href={`/blog/${post.slug}`}
							image={post.image}
							imageMeta={post.imageMeta}
						>
							<CardBody title={post.title} icon={IconDocument}>
								{post.summary}
							</CardBody>
							<CardFooter>
								<time className="text-foreground-tertiary">{formatDate(post.date, true)}</time>
								<span className="text-foreground-tertiary">·</span>
								<p className="text-foreground-tertiary">{post.readingTime}</p>
							</CardFooter>
						</Card>
					))}
				</div>
			</section>
		</main>
	);
}
