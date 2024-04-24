import { Post } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import readingTime from 'reading-time';

type PostListRelatedProps = {
	posts: Post[];
};

export default function PostListRelated({ posts }: PostListRelatedProps) {
	return (
		<ul className="flex flex-col opacity-list">
			{posts
				.sort((a, b) => {
					if (new Date(a.data.publishedAt) > new Date(b.data.publishedAt)) {
						return -1;
					}
					return 1;
				})
				.map((post) => (
					<Link
						key={post.slug}
						className="flex flex-col w-full gap-2 py-4 px-2 font-medium rounded-xl hover:bg-brand/5 transition duration-300 ease-in-out group"
						href={`/blog/${post.slug}`}
					>
						<div className="flex w-full gap-x-4 items-center">
							<time className="text-foreground-secondary">
								{formatDate(post.data.publishedAt, false, true)}
							</time>

							<span className="text-brand font-bold">/</span>
							<p className="text-foreground-secondary">{readingTime(post.content).text}</p>
						</div>
						<h4 className="text-lg group-hover:text-brand transition-colors text-pretty">
							{post.data.title}
						</h4>
					</Link>
				))}
		</ul>
	);
}
