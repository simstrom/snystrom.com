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
import { IconArrow, IconDocument } from '@/data/icons';
import { getBlogPosts, getLatestBlogPost } from '@/lib/blog';
import { getLimitedImages } from '@/lib/gallery';
import { formatDate } from '@/lib/utils';

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	alternates: {
		canonical: SITE_URL,
	},
};

export default async function Home() {
	const galleryImages = await getLimitedImages(4);
	const blogPosts = getBlogPosts();
	const latestPost = getLatestBlogPost();

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
						className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-foreground-secondary/5 text-foreground-secondary ring-1 ring-transparent ring-offset-background transition-all hover:bg-foreground-secondary/10 hover:text-foreground hover:ring-brand hover:ring-offset-2"
					>
						<IconArrow className="w-4 h-4" />
					</Link>
				</div>
				<div className="grid grid-cols-2 gap-x-4 px-4 border-y">
					{blogPosts.slice(0, 2).map((post, idx) => (
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
