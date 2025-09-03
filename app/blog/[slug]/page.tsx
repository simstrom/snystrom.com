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
import { Section } from '@/components/ui/section';
import { getBlogPost, getBlogPosts, getRelatedPosts } from '@/lib/blog';
import { SITE_INSTAGRAM_URL, SITE_LINKEDIN_URL, SITE_NAME, SITE_URL } from '@/lib/constants';
import { createOgImage } from '@/lib/createOgImage';
import { IconCalendar, IconHourglass } from '@/lib/icons';
import { formatDate } from '@/lib/utils';
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
			<main className="grow w-full mx-auto">
				<div className="max-w-5xl mx-auto pt-24 border-x">
					<Button
						variant="link"
						href="/blog"
						backLink
						className="rounded-tr-md text-foreground-secondary hover:bg-foreground hover:text-background transition-colors pl-6 pr-8 py-4"
					>
						Blog
					</Button>
				</div>

				<Section className="max-w-5xl mx-auto pb-0" borderOrigin="y">
					{/* {post.image && post.imageMeta && (
						<Image
							priority
							src={post.image}
							alt={`${post.title} post image`}
							width={post.imageMeta.width}
							height={post.imageMeta.height}
							placeholder="blur"
							blurDataURL={post.imageMeta.blur}
							draggable={false}
							className="w-full aspect-video object-cover border-b"
						/>
					)} */}

					<header className="relative">
						<span className="absolute top-6 z-10 h-px w-full bg-zinc-500/75 mix-blend-screen md:top-12" />
						<span className="absolute bottom-6 z-10 h-px w-full bg-zinc-500/75 mix-blend-screen md:bottom-12" />
						<span className="absolute left-6 z-10 h-full w-px bg-zinc-500/75 mix-blend-screen md:left-12" />
						<span className="absolute right-6 z-10 h-full w-px bg-zinc-500/75 mix-blend-screen md:right-12" />

						<span className="absolute left-[44.5px] top-12 z-20 hidden h-px w-2 bg-white md:block" />
						<span className="absolute left-[48px] top-[44.5px] z-20 hidden h-2 w-px bg-white md:block" />

						<span className="absolute right-[44.5px] top-12 z-20 hidden h-px w-2 bg-white md:block" />
						<span className="absolute right-[48px] top-[44.5px] z-20 hidden h-2 w-px bg-white md:block" />

						<span className="absolute bottom-12 left-[44.5px] z-20 hidden h-px w-2 bg-white md:block" />
						<span className="absolute bottom-[44.5px] left-[48px] z-20 hidden h-2 w-px bg-white md:block" />

						<span className="absolute bottom-12 right-[44.5px] z-20 hidden h-px w-2 bg-white md:block" />
						<span className="absolute bottom-[44.5px] right-[48px] z-20 hidden h-2 w-px bg-white md:block" />

						<div
							className="h-[520px] flex flex-col gap-2 justify-end p-16 rounded-3xl bg-no-repeat bg-cover bg-center ring-1 ring-border text-background dark:text-foreground"
							style={{
								backgroundImage: `linear-gradient(to top, var(--color-brand) 0%, rgba(105, 120, 255, 0.1) 50%, transparent 70%), url(${post.image})`,
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
							<PageHeader title={post.title} className="border-x-0 p-0 m-0 text-balance" />
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
					</header>
				</Section>
				{/* <div className="max-w-5xl mx-auto pt-8 border-x"></div> */}
				<Section className="pt-16 pb-12">
					<article className="prose max-w-3xl mx-auto">
						<MDXContent code={post.body} components={MDXComponents} />

						<div className="pt-12">
							<div className="flex items-center gap-x-4">
								<Image
									width={64}
									height={64}
									src={avatar}
									alt=""
									draggable={false}
									className="rounded-full not-prose border"
								/>
								<div className="flex flex-col">
									<span className="text-sm font-medium text-foreground-secondary">Simon says:</span>
									<span className="font-medium text-lg text-foreground">
										Hey, thanks for reading! 👋
									</span>
								</div>
							</div>
							<p className="mt-3">
								If you enjoyed this article, check out some of my other posts below. Have questions,
								feedback, or just want to connect? Find me on{' '}
								<CustomLink href={SITE_LINKEDIN_URL}>Github</CustomLink> or drop me a message on{' '}
								<CustomLink href={SITE_INSTAGRAM_URL}>LinkedIn</CustomLink> and let&apos;s chat.
							</p>
						</div>
					</article>
				</Section>

				{/* <Section className="flex-row justify-between items-center pl-6 pb-0 bg-background-secondary">
					<p className="font-medium text-lg tracking-normal">Like it? Share it</p>
					<div className="flex items-center text-foreground-secondary">
						<div className="hover:text-background hover:bg-foreground transition-colors p-4">
							<IconLinkedin width={28} height={28} />
						</div>
						<div className="hover:text-background hover:bg-foreground transition-colors p-4">
							<IconReact width={28} height={28} />
						</div>
						<div className="hover:text-background hover:bg-foreground transition-colors p-4">
							<IconCheck width={28} height={28} />
						</div>
						<div className="hover:text-background hover:bg-foreground transition-colors p-4">
							<IconGithub width={28} height={28} />
						</div>
						<div className="hover:text-background hover:bg-foreground transition-colors p-4">
							<IconActivity width={28} height={28} />
						</div>
					</div>
				</Section> */}

				{/* <Section className="p-6 pb-8">
				<div className="prose max-w-3xl mx-auto">
					<div className="flex items-center gap-x-4">
						<Image
							width={64}
							height={64}
							src={avatar}
							alt=""
							draggable={false}
							className="rounded-full not-prose border border-border"
						/>
						<div className="flex flex-col">
							<span className="text-sm font-medium text-foreground-secondary">Simon says:</span>
							<span className="font-medium text-lg">Hey, thanks for reading! 👋</span>
						</div>
					</div>
					<p className="mt-3">
						If you enjoyed this article, check out some of my other posts below. Have questions,
						feedback, or just want to connect? Find me on{' '}
						<CustomLink href={SITE_LINKEDIN_URL}>Github</CustomLink> or drop me a message on{' '}
						<CustomLink href={SITE_INSTAGRAM_URL}>LinkedIn</CustomLink> and let&apos;s chat.
					</p>
				</div>
				</Section> */}

				{related.length > 0 && (
					<Section className="pb-0" borderOrigin={null}>
						<h3 className="text-3xl p-6 border-b bg-background-secondary">More reading</h3>
						<PostListRelated posts={related.slice(0, 3)} />
					</Section>
				)}
			</main>
		</>
	);
}

export async function generateStaticParams() {
	const posts = getBlogPosts();
	return posts.map((post) => ({ slug: post.slug }));
}
