import { IconArrowRight } from '@/lib/icons';
import { Post } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import readingTime from 'reading-time';

type PostListRelatedProps = {
	posts: Post[];
};

export default function PostListRelated({ posts }: PostListRelatedProps) {
	return (
		<ul className="flex flex-col gap-3">
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
						className="relative flex gap-x-1 w-full p-5 items-end group transition border shadow-sm rounded-xl bg-gradient-to-br from-background-tertiary to-background-tertiary/20 hover:border-border/20 dark:hover:border-border/30"
						href={`/blog/${post.slug}`}
					>
						<div>
							<div className="flex gap-x-2 items-center text-sm font-medium">
								<time className="text-foreground-secondary">
									{formatDate(post.data.publishedAt, false, true)}
								</time>

								<span className="text-foreground/30">/</span>
								<p className="text-foreground-secondary">{readingTime(post.content).text}</p>
							</div>
							<h4 className="text-pretty">{post.data.title}</h4>
						</div>
						<IconArrowRight className="ml-auto min-w-4" />
					</Link>
				))}
		</ul>
	);
}
