import MDXComponents from '@/components/MDXComponents';
import { getBlogPost, getBlogPosts } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';

interface Props {
	params: {
		slug: string;
	};
}

export async function generateMetadata({ params }: Props) {
	const post = getBlogPost(params.slug);
	if (!post) {
		return;
	}

	return {
		title: post.data.title,
	};
}

export default function BlogPost({ params }: Props) {
	const post = getBlogPost(params.slug);
	if (!post) return notFound();

	return (
		<section className="flex flex-col justify-center mt-32 sm:mt-40 max-w-2xl container">
			<h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
				{post.data.title}
			</h1>
			<div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
				<p className="text-sm text-neutral-600 dark:text-neutral-400">{post.data.publishedAt}</p>
			</div>
			<article className="prose prose-quoteless dark:prose-invert">
				<MDXRemote source={post.content} components={MDXComponents} />
			</article>
		</section>
	);
}

export async function generateStaticParams() {
	const posts = getBlogPosts();
	return posts.map((post) => ({ slug: post.slug }));
}
