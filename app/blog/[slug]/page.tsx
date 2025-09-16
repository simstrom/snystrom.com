import Callout from '@/components/blog/Callout';
import CustomLink from '@/components/blog/Link';
import MDXComponents from '@/components/blog/MDXcomponents';
import Tag from '@/components/blog/Tag';
import PageHeader from '@/components/layouts/PageHeader';
import { Section } from '@/components/layouts/Section';
import PostListRelated from '@/components/ui/PostListRelated';

import { SITE_GITHUB_URL, SITE_LINKEDIN_URL, SITE_NAME, SITE_URL } from '@/data/constants';
import { IconBack, IconCalendar, IconHourglass } from '@/data/icons';
import { getBlogPost, getBlogPosts, getRelatedPosts } from '@/lib/blog';
import { formatDate } from '@/lib/utils';
import avatar from '@/public/images/avatar.jpg';

import { MDXContent } from '@content-collections/mdx/react';
import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { BlogPosting, WithContext } from 'schema-dts';

interface Props {
	params: Promise<{
		slug: string;
	}>;
}

export async function generateMetadata(
	props: Props,
	parent: ResolvingMetadata
): Promise<Metadata | undefined> {
	const params = await props.params;
	const post = getBlogPost(params.slug);
	if (!post) {
		return;
	}

	const { title, summary, date, image } = post;
	const previousImages = (await parent)?.openGraph?.images || [];

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
			authors: ['Simon Nyström'],
			url: `${SITE_URL}/blog/${post.slug}`,
			images: [
				{
					url: `/api/ogBlog?title=${encodeURIComponent(title)}&image=${encodeURIComponent(
						image || ''
					)}&tags=${encodeURIComponent(post.tags.slice(0, 3).join(','))}`,
					width: 1200,
					height: 630,
					alt: title,
					type: 'image/png',
				},
				...previousImages,
			],
		},
		twitter: {
			title,
			description: summary,
			card: 'summary_large_image',
			images: [
				{
					url: `/api/ogBlog?title=${encodeURIComponent(title)}&image=${encodeURIComponent(
						image || ''
					)}&tags=${encodeURIComponent(post.tags.slice(0, 3).join(','))}`,
					width: 1200,
					height: 630,
					alt: title,
				},
				...previousImages,
			],
		},
	};
}

export default async function BlogPost(props: Props) {
	const params = await props.params;
	const post = getBlogPost(params.slug);
	if (!post) return notFound();

	const related = getRelatedPosts(post);

	const jsonLd: WithContext<BlogPosting> = {
		'@type': 'BlogPosting',
		'@context': 'https://schema.org',
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `${SITE_URL}`,
		},
		headline: post.title,
		description: post.summary,
		keywords: post.tags.join(', '),
		url: `${SITE_URL}/blog/${post.slug}`,
		datePublished: post.date.toISOString(),
		dateModified: post.date.toISOString(),
		image: `${SITE_URL}/api/ogBlog?title=${encodeURIComponent(
			post.title
		)}&image=${encodeURIComponent(post.image || '')}&tags=${encodeURIComponent(
			post.tags.slice(0, 3).join(',')
		)}`,
		author: {
			'@type': 'Person',
			name: SITE_NAME,
			url: SITE_URL,
		},
		publisher: {
			'@type': 'Organization',
			name: SITE_NAME,
			logo: {
				'@type': 'ImageObject',
				url: `${SITE_URL}/favicon.ico`,
			},
		},
		isAccessibleForFree: true,
	};

	return (
		<main className="grow w-full mx-auto">
			<Script
				type="application/ld+json"
				id={`${post.slug}_jsonLd`}
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>

			<div className="max-w-5xl mx-auto pt-24">
				<Link
					href={'/blog'}
					className="block w-fit p-2 ml-4 mb-4 rounded-full ring-1 ring-border text-foreground-secondary transition-all hover:text-brand hover:ring-brand/20 hover:bg-brand/20"
				>
					<IconBack className="w-5 h-5 rotate-180" />
				</Link>
			</div>

			<Section className="max-w-5xl mx-auto pb-0" borderOrigin="y">
				<div className="relative">
					{/* LINES */}
					<span className="absolute top-6 z-10 h-px w-full bg-zinc-500/75 mix-blend-screen md:top-12" />
					<span className="absolute bottom-6 z-10 h-px w-full bg-zinc-500/75 mix-blend-screen md:bottom-12" />
					<span className="absolute left-6 z-10 h-full w-px bg-zinc-500/75 mix-blend-screen md:left-12" />
					<span className="absolute right-6 z-10 h-full w-px bg-zinc-500/75 mix-blend-screen md:right-12" />

					{/* CROSSES */}
					<span className="absolute left-[40.5px] top-12 z-20 hidden h-px w-4 bg-white md:block" />
					<span className="absolute left-[48px] top-[40.5px] z-20 hidden h-4 w-px bg-white md:block" />

					<span className="absolute right-[40.5px] top-12 z-20 hidden h-px w-4 bg-white md:block" />
					<span className="absolute right-[48px] top-[40.5px] z-20 hidden h-4 w-px bg-white md:block" />

					<span className="absolute bottom-12 left-[40.5px] z-20 hidden h-px w-4 bg-white md:block" />
					<span className="absolute bottom-[40.5px] left-[48px] z-20 hidden h-4 w-px bg-white md:block" />

					<span className="absolute bottom-12 right-[40.5px] z-20 hidden h-px w-4 bg-white md:block" />
					<span className="absolute bottom-[40.5px] right-[48px] z-20 hidden h-4 w-px bg-white md:block" />

					<div
						className="h-[520px] bg-[#7d9ff0] dark:bg-[#102e73] flex flex-col gap-2 justify-end p-16 rounded-3xl bg-no-repeat bg-cover bg-center ring-1 ring-border text-background dark:text-foreground"
						style={{
							backgroundImage: `linear-gradient(to top, #2663f2 0%, transparent 90%), url(${
								post.image ?? ''
							})`,
						}}
					>
						<ul className="w-fit flex items-center gap-4 flex-wrap pb-2">
							{post.tags?.map((tag, idx) => (
								<Tag
									key={idx}
									tag={tag}
									className="text-xs rounded-sm py-0.5 px-2 text-background dark:text-foreground bg-background/10 dark:bg-foreground/10 hover:bg-background hover:text-foreground dark:hover:bg-foreground dark:hover:text-background"
								/>
							))}
						</ul>
						<PageHeader title={post.title} className="p-0 m-0 bg-transparent" />
						<div className="flex items-center gap-6 text-sm font-medium">
							<div className="flex items-center gap-x-2">
								<IconCalendar width={16} height={16} />
								<time>{formatDate(post.date)}</time>
							</div>
							<div className="flex items-center gap-x-2">
								<IconHourglass width={16} height={16} />
								<p>{post.readingTime}</p>
							</div>
						</div>
					</div>
				</div>
			</Section>

			<article className="prose max-w-none mt-8">
				<div className="wrapper pb-10">
					<MDXContent code={post.body} components={MDXComponents} />
				</div>

				<Callout variant="ignore">
					<>
						<div className="flex items-center gap-x-4">
							<Image
								width={64}
								height={64}
								src={avatar}
								alt=""
								draggable={false}
								className="rounded-full not-prose border grayscale ring-1 ring-border"
							/>
							<div className="flex flex-col">
								<span className="text-sm font-medium text-foreground-secondary">Simon says:</span>
								<span className="font-medium text-lg text-foreground">
									Hey, thanks for reading! 👋
								</span>
							</div>
						</div>
						<p className="p-4">
							If you enjoyed this article, check out some of my other posts below. Have questions,
							feedback, or just want to connect?
						</p>
						<p className="px-4 pb-4">
							Find me on <CustomLink href={SITE_GITHUB_URL}>Github</CustomLink> or drop me a message
							on <CustomLink href={SITE_LINKEDIN_URL}>LinkedIn</CustomLink> and let&apos;s chat.
						</p>
					</>
				</Callout>
			</article>

			{related.length > 0 && (
				<Section borderOrigin={null}>
					<h3 className="text-3xl p-6 border-b bg-background">More reading</h3>
					<PostListRelated posts={related.slice(0, 3)} />
				</Section>
			)}
		</main>
	);
}

export async function generateStaticParams() {
	const posts = getBlogPosts();
	return posts.map((post) => ({ slug: post.slug }));
}
