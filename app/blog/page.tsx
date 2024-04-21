import { getBlogPosts } from '@/lib/blog';
import { formatDateAsRelative } from '@/lib/utils';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Blog',
	description:
		'Discover my thoughts, insights and learnings on software development, design and beyond.',
};

export default function Blog() {
	const blogPosts = getBlogPosts();

	return (
		<section className="flex flex-col justify-center mt-32 sm:mt-40">
			<h1 className="font-medium text-2xl mb-8 tracking-tighter">read my blog</h1>
			{blogPosts
				.sort((a, b) => {
					if (new Date(a.data.publishedAt) > new Date(b.data.publishedAt)) {
						return -1;
					}
					return 1;
				})
				.map((post) => (
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
		</section>
	);
}
