import MDXComponents from '@/components/MDXComponents';
import { getBlogPost, getBlogPosts } from '@/lib/blog';
import { IconArrowRight } from '@/lib/icons';
import { formatDate } from '@/lib/utils';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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

	return (
		<main className="flex flex-col justify-center max-w-2xl mx-auto mt-32 sm:mt-40">
			<Link href="/blog" className="inline-flex gap-x-2 text-sm tracking-tight font-medium">
				<IconArrowRight />
				Back to Blog
			</Link>
			<h1 className="text-3xl sm:text-4xl tracking-tight">{post.data.title}</h1>
			<div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
				<p className="text-sm text-neutral-600 dark:text-neutral-400">
					{formatDate(post.data.publishedAt, true)}
				</p>
			</div>
			{post.data.image && (
				<Image
					src={post.data.image}
					alt={`${post.data.title} post image`}
					width={672}
					height={378}
					className="w-[672px] h-[378px] rounded-xl object-cover border shadow-shadow"
					priority
				/>
			)}
			<article className="prose dark:prose-invert max-w-none prose-headings:font-medium prose-headings:text-foreground prose-headings:relative">
				<MDXRemote source={post.content} components={MDXComponents} />
			</article>
		</main>
	);
}

export async function generateStaticParams() {
	const posts = getBlogPosts();
	return posts.map((post) => ({ slug: post.slug }));
}
