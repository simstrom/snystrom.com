import { Post } from '@/.content-collections/generated';
import { IconArrowRight } from '@/lib/icons';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

type PostListRelatedProps = {
	posts: Post[];
};

export default function PostListRelated({ posts }: PostListRelatedProps) {
	return (
		<ul className="divide-y">
			{posts.map((post) => (
				<Link
					key={post.slug}
					className="relative flex gap-x-1 w-full items-end px-6 py-4 group transition-colors hover:text-background hover:bg-foreground"
					href={`/blog/${post.slug}`}
				>
					<div>
						<div className="mb-1 flex gap-x-2 items-center text-sm font-medium text-foreground-secondary group-hover:text-background/80 transition-colors">
							<time>{formatDate(post.date, true)}</time>
							<span className="text-foreground-tertiary">·</span>
							<p>{post.readingTime}</p>
						</div>
						<h4 className="text-pretty text-lg mb-1">{post.title}</h4>
						<p className="text-sm text-foreground-secondary line-clamp-2 leading-normal group-hover:text-background/80 transition-colors">
							{post.summary}
						</p>
					</div>
					<IconArrowRight className="ml-auto h-6 w-6" />
				</Link>
			))}
		</ul>
	);
}
