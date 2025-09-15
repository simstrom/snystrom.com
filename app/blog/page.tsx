import PageHeader from '@/components/layouts/PageHeader';
import { Section } from '@/components/layouts/Section';
import CardOverlay from '@/components/ui/CardOverlay';
import PostList from '@/components/ui/PostList';
import { TagSelector } from '@/components/ui/TagSelector';
import { SITE_NAME, SITE_URL } from '@/data/constants';

import { IconArrowRight, IconCalendar, IconHourglass } from '@/data/icons';
import { getAllTags, getBlogPosts } from '@/lib/blog';
import { formatDate } from '@/lib/utils';

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { Blog as BlogLeaf, WithContext } from 'schema-dts';

export const metadata: Metadata = {
	title: 'Blog',
	description: 'Insights, tutorials, and ideas from my journey in tech.',
};

export default async function Blog() {
	const posts = getBlogPosts();
	const tags = getAllTags();
	const featured = posts.find((p) => p.image !== undefined && p.imageMeta !== null);

	const jsonLd: WithContext<BlogLeaf> = {
		'@type': 'Blog',
		'@context': 'https://schema.org',
		name: `${SITE_NAME} Blog`,
		description: metadata.description || '',
		url: `${SITE_URL}/blog`,
		publisher: {
			'@type': 'Person',
			name: SITE_NAME,
			url: SITE_URL,
		},
		hasPart: posts.slice(0, 5).map((post) => ({
			'@type': 'BlogPosting',
			headline: post.title,
			description: post.summary,
			url: `${SITE_URL}/blog/${post.slug}`,
		})),
	};

	return (
		<main className="grow">
			<Script
				type="application/ld+json"
				id="blog_jsonLd"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>

			<PageHeader title="Blog" content="Insights, tutorials, and ideas from my journey in tech." />

			{featured?.image && featured.imageMeta && (
				<Section borderOrigin={'y'} className="pb-0">
					<Link href={`/blog/${featured.slug}`} className="flex group bg-background">
						<div className="relative flex-1 flex flex-col justify-center space-y-2 px-6 py-4">
							<h3 className="text-2xl">{featured.title}</h3>
							<p className="text-[15px] leading-7 line-clamp-3">{featured.summary}</p>
							<div className="pt-2 flex items-center gap-6 text-sm font-medium text-foreground-secondary transition-colors">
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
						<div className="relative rounded-2xl p-6">
							<Image
								priority
								src={featured.image}
								alt={`${featured.title} post image`}
								width={featured.imageMeta.width}
								height={featured.imageMeta.height}
								placeholder="blur"
								blurDataURL={featured.imageMeta.blur}
								draggable={false}
								className="w-full md:aspect-3/2 object-cover rounded-2xl ring-1 ring-border ring-offset-4 ring-offset-background transition-all duration-300 group-hover:ring-offset-8 group-hover:ring-brand/80"
							/>

							<CardOverlay />
						</div>
					</Link>
				</Section>
			)}

			<Section borderOrigin={featured?.image && featured.imageMeta ? null : 't'}>
				<TagSelector tags={tags} activeTag={''} />
				<PostList posts={posts} />
			</Section>
		</main>
	);
}
