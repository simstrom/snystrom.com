import MDXComponents from '@/components/MDXComponents';
import { getBlogPost, getBlogPosts, getRelatedPosts } from '@/lib/blog';
import { IconArrowLeft } from '@/lib/icons';
import { formatDate, formatDateAsRelative } from '@/lib/utils';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import readingTime from 'reading-time';

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

	const { title, summary, publishedAt, image } = post.data;
	const seoImage = image ? `https://snystrom.com${image}` : `https://snystrom.com/og.png`;

	return {
		title,
		description: summary,
		openGraph: {
			title,
			description: summary,
			type: 'article',
			publishedTime: publishedAt,
			url: `https://snystrom.com/blog/${post.slug}`,
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

export default function BlogPost({ params }: Props) {
	const post = getBlogPost(params.slug);
	if (!post) return notFound();

	const related = getRelatedPosts(post);

	return (
		<main className="flex flex-col gap-3 justify-center max-w-2xl mx-auto mt-32 sm:mt-40">
			{post.data.image && (
				<Image
					src={post.data.image}
					alt={`${post.data.title} post image`}
					width={672}
					height={378}
					className="max-w-[672px] max-h-[378px] w-full aspect-video rounded-xl object-cover border mb-3"
					priority
				/>
			)}
			<div className="flex flex-col gap-10 pb-20">
				<div className="article-header flex flex-col gap-2 sm:gap-4">
					<div className="font-medium flex items-center gap-1 flex-wrap tracking-[0.02em] text-sm">
						{post.data.tags?.map((tag, idx) => (
							<Link
								href={`/blog/tag/${tag.toLowerCase()}`}
								className="px-2 py-0.5 rounded-lg hover:bg-brand-secondary/10 hover:text-brand-secondary cursor-pointer transition duration-300 ease-in-out"
							>
								#{tag.toLowerCase()}
							</Link>
						))}
					</div>
					<h1 className="text-3xl tracking-tight">{post.data.title}</h1>
					<div className="font-medium tracking-[0.02em] flex flex-wrap justify-between items-center gap-y-3 text-sm text-foreground/80">
						<div className="flex items-center gap-2">
							<time>{formatDate(post.data.publishedAt)}</time>
							<span className="text-brand font-bold">/</span>
							<div>123 views</div>
							<span className="text-brand font-bold">/</span>
							<p>{readingTime(post.content).text}</p>
						</div>
						<div className="px-2 py-0.5 bg-brand-secondary/10 text-brand text-sm rounded-lg">
							<span>Updated </span>
							<time>{formatDateAsRelative(post.data.updatedAt ?? post.data.publishedAt)}</time>
						</div>
					</div>
				</div>
				<article className="prose dark:prose-invert max-w-none prose-headings:font-medium prose-headings:text-foreground prose-headings:relative">
					<MDXRemote source={post.content} components={MDXComponents} />
					<hr className="border-border/20" />
				</article>

				{related.length > 0 && (
					<div className="flex flex-col gap-10">
						<h3 className="text-3xl">Related posts</h3>
						<div className="will-change-transform">
							<ul className="flex flex-col animated-list">
								{related.map((post) => (
									<Link
										key={post.slug}
										className="flex flex-col space-y-1 mb-4"
										href={`/blog/${post.slug}`}
									>
										<div className="w-full flex flex-col">
											<p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
												{post.data.title}
											</p>
											<time className="text-sm text-foreground-secondary">
												{formatDateAsRelative(post.data.publishedAt)}
											</time>
										</div>
									</Link>
								))}
							</ul>
						</div>
					</div>
				)}
				<Link
					href="/blog"
					className="inline-flex items-center gap-x-2 text-sm tracking-wide font-medium mb-5 hover:text-brand-secondary transition"
				>
					<IconArrowLeft width={18} height={18} />
					Back to all
				</Link>
			</div>
		</main>
	);
}

export async function generateStaticParams() {
	const posts = getBlogPosts();
	return posts.map((post) => ({ slug: post.slug }));
}
