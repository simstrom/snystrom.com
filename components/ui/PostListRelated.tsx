import { Post } from '@/.content-collections/generated';
import { IconArrowRight } from '@/data/icons';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

type PostListRelatedProps = {
	posts: Post[];
};

export default function PostListRelated({ posts }: PostListRelatedProps) {
	return (
		<ul className="divide-y border-b">
			{posts.map((post) => (
				<Link
					key={post.slug}
					className="relative flex gap-x-1 w-full items-end p-6 group transition-colors hover:text-background hover:bg-foreground"
					href={`/blog/${post.slug}`}
				>
					<div className="">
						<h4 className="text-pretty text-xl mb-1">{post.title}</h4>
						<div className="mb-6 flex gap-x-2 items-center text-sm font-medium text-foreground-secondary group-hover:text-background/80 transition-colors">
							<time>{formatDate(post.date, true)}</time>
							<span className="text-foreground-tertiary">·</span>
							<p>{post.readingTime}</p>
						</div>
						<p className="text-sm text-foreground-secondary line-clamp-2 leading-relaxed group-hover:text-background/80 transition-colors">
							{post.summary}
						</p>
					</div>
					<IconArrowRight className="ml-auto min-h-6 min-w-6" />
				</Link>
			))}
		</ul>
	);
}
