import { MDXContent } from '@content-collections/mdx/react';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Script from 'next/script';

import CustomLink from '@/components/blog/link';
import MDXComponents from '@/components/blog/MDXcomponents';
import Tag from '@/components/blog/tag';
import PostListRelated from '@/components/postListRelated';
import Button from '@/components/ui/button';
import PageHeader from '@/components/ui/pageHeader';
import { getBlogPost, getBlogPosts, getRelatedPosts } from '@/lib/blog';
import { SITE_INSTAGRAM_URL, SITE_LINKEDIN_URL, SITE_NAME, SITE_URL } from '@/lib/constants';
import { createOgImage } from '@/lib/createOgImage';
import { cn, formatDate } from '@/lib/utils';
import avatar from '@/public/images/avatar.avif';

interface Props {
	params: {
		slug: string;
	};
}

export async function generateMetadata({ params }: Props): Promise<Metadata | undefined> {
	const post = getBlogPost(params.slug);
	if (!post) {
		return;
	}

	const { title, summary, date } = post;
	const seoImage = createOgImage({
		title: post.title,
		meta: [formatDate(post.date, true, true), ...post.tags.slice(0, 3)].join(' · '),
	});

	return {
		title,
		description: summary,
		alternates: {
			canonical: `/blog/${post.slug}`,
		},
		openGraph: {
			title,
			description: summary,
			type: 'article',
			publishedTime: date.toISOString(),
			url: `${SITE_URL}/blog/${post.slug}`,
			images: [
				{
					url: seoImage,
					width: 1600,
					height: 836,
					alt: title,
					type: 'image/png',
				},
			],
		},
		twitter: {
			title,
			description: summary,
			card: 'summary_large_image',
			images: [
				{
					url: seoImage,
					width: 1600,
					height: 836,
					alt: title,
				},
			],
		},
	};
}

export default async function BlogPost({ params }: Props) {
	const post = getBlogPost(params.slug);
	if (!post) return notFound();

	const related = getRelatedPosts(post);

	const jsonLd = {
		'@type': 'Article',
		'@context': 'https://schema.org',
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `${SITE_URL}`,
		},
		headline: post.title,
		description: post.summary,
		url: `${SITE_URL}/blog/${post.slug}`,
		datePublished: post.date.toISOString(),
		dateModified: post.date.toISOString(),
		image: createOgImage({
			title: post.title,
			meta: [formatDate(post.date, true, true), ...post.tags.slice(0, 3)].join(' · '),
		}),
		author: {
			'@type': 'Person',
			name: SITE_NAME,
			url: SITE_URL,
		},
		isAccessibleForFree: true,
	};

	return (
		<>
			<Script
				type="application/ld+json"
				id={`${post.slug}_jsonLd`}
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<main className="grow flex flex-col gap-3 w-[inherit] max-w-2xl mx-auto pt-32 sm:pt-40 animate-slide">
				<Button
					variant="link"
					href="/blog"
					backLink
					className={cn(
						'text-foreground-secondary hover:text-brand transition-colors',
						post.image ? 'mb-4' : 'mb-8'
					)}
				>
					Blog
				</Button>
				{post.image && post.imageMeta && (
					<Image
						priority
						src={post.image}
						alt={`${post.title} post image`}
						width={post.imageMeta.width}
						height={post.imageMeta.height}
						placeholder="blur"
						blurDataURL={post.imageMeta.blur}
						draggable={false}
						className="w-full aspect-video rounded-xl object-cover border mb-3"
					/>
				)}

				<header className="article-header flex flex-col gap-1">
					<ul className="opacity-list w-fit flex items-center gap-1 flex-wrap mb-2">
						{post.tags?.map((tag, idx) => (
							<Tag key={idx} tag={tag} />
						))}
					</ul>
					<PageHeader title={post.title} />
					<div className="font-medium flex flex-wrap justify-between items-center gap-y-3 text-sm text-foreground/80">
						<div className="flex items-center gap-2">
							<time>{formatDate(post.date)}</time>
							<span className="text-foreground/30">·</span>
							<p>{post.readingTime}</p>
						</div>
					</div>
				</header>

				<article className="mt-8 mb-10 prose max-w-none">
					<MDXContent code={post.body} components={MDXComponents} />
				</article>

				<div className="mb-8 py-4 border-t prose">
					<div className="flex items-center gap-x-4">
						<Image
							width={64}
							height={64}
							src={avatar}
							alt=""
							draggable={false}
							className="rounded-full not-prose"
						/>
						<div className="flex flex-col">
							<span className="text-sm text-foreground-secondary">Simon says:</span>
							<span>Hey, thanks for reading! 👋</span>
						</div>
					</div>
					<p className="mt-3">
						If you enjoyed this article, check out some of my other posts below. Have questions,
						feedback, or just want to connect? Find me on{' '}
						<CustomLink href={SITE_LINKEDIN_URL}>Github</CustomLink> or drop me a message on{' '}
						<CustomLink href={SITE_INSTAGRAM_URL}>LinkedIn</CustomLink> and let&apos;s chat.
					</p>
				</div>

				{related.length > 0 && (
					<section className="space-y-3 mb-10">
						<h3 className="text-2xl">Related posts</h3>
						<PostListRelated posts={related.slice(0, 3)} />
					</section>
				)}
			</main>
		</>
	);
}

export async function generateStaticParams() {
	const posts = getBlogPosts();
	return posts.map((post) => ({ slug: post.slug }));
}
