import { Section, SectionHeader } from '@/components/layouts/Section';
import {
	BentoCardAbout,
	BentoCardBlog,
	BentoCardGallery,
	BentoCardProjects,
} from '@/components/sections/BentoCards';
import Hero from '@/components/sections/Hero';
import { BentoGrid } from '@/components/ui/Bento';
import { Card, CardBody, CardFooter } from '@/components/ui/Card';

import { SITE_URL } from '@/data/constants';
import { IconDocument } from '@/data/icons';
import { getBlogPosts, getLatestBlogPost } from '@/lib/blog';
import { getLimitedImages } from '@/lib/gallery';
import { formatDate } from '@/lib/utils';

import { Metadata } from 'next';

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
		<main className="grow pt-40">
			<Section className="space-y-8 text-center">
				<Hero />
			</Section>

			<Section>
				<BentoGrid>
					<BentoCardAbout />
					<BentoCardGallery images={galleryImages} />
					<BentoCardProjects />
					{latestPost && <BentoCardBlog latestPost={latestPost} />}
				</BentoGrid>
			</Section>

			<Section>
				<SectionHeader title="Latest Blog Posts" subtitle="Blog" linkHref="/blog" />

				<div className="max-w-2xl mx-auto grid grid-cols-2 gap-4">
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
			</Section>
		</main>
	);
}
