import LikeButton from '@/components/blog/likeButton';
import MDXComponents from '@/components/blog/MDXcomponents';
import Tag from '@/components/blog/tag';
import PostListRelated from '@/components/postListRelated';
import Button from '@/components/ui/button';
import PageHeader from '@/components/ui/pageHeader';
import ViewCounter from '@/components/ui/viewCounter';
import { incrementViews } from '@/lib/actions';
import { getBlogPost, getBlogPosts, getRelatedPosts } from '@/lib/blog';
import { createOgImage } from '@/lib/createOgImage';
import { getPostInteractions } from '@/lib/queries';
import { cn, formatDate } from '@/lib/utils';
import { MDXContent } from '@content-collections/mdx/react';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Script from 'next/script';

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
		meta: [formatDate(post.date, false, true, true), ...post.tags.slice(0, 3)].join(' · '),
	});

	return {
		title,
		description: summary,
		openGraph: {
			title,
			description: summary,
			type: 'article',
			publishedTime: date.toISOString(),
			url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
			images: seoImage,
		},
		twitter: {
			title,
			description: summary,
			images: seoImage,
			card: 'summary_large_image',
		},
	};
}

export default async function BlogPost({ params }: Props) {
	const post = getBlogPost(params.slug);
	if (!post) return notFound();

	incrementViews(post.slug);
	const postInteractions = await getPostInteractions(post.slug);
	const related = getRelatedPosts(post);

	const jsonLd = {
		'@type': 'BlogPost',
		'@context': 'https://schema.org',
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
		},
		headline: post.title,
		description: post.summary,
		image: post.image,
		datePublished: post.date.toISOString(),
		dateModified: post.date.toISOString(),
		author: 'Simon Nyström',
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
				{post.image && post.imageBlur && (
					<Image
						priority
						src={post.image}
						alt={`${post.title} post image`}
						width={672}
						height={378}
						placeholder="blur"
						blurDataURL={post.imageBlur}
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
							<span className="text-foreground/30">/</span>
							<ViewCounter views={postInteractions?.views ? postInteractions.views + 1 : 1} />
							<span className="text-foreground/30">/</span>
							<p>{post.readingTime}</p>
						</div>
					</div>
				</header>
				<article className="mt-8 mb-10 sm:mb-20 prose dark:prose-invert max-w-none prose-headings:font-medium prose-headings:text-foreground prose-headings:relative">
					<MDXContent code={post.body} components={MDXComponents} />
				</article>
				<div className="mb-20 flex items-center justify-center">
					<LikeButton likes={postInteractions?.likes} slug={post.slug} />
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
