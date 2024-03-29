import Link from 'next/link';

export default function BlogListItem({ article, interactions }) {
	const views = !interactions ? 0 : interactions.data.views || 0;
	const likes = !interactions ? 0 : interactions.data.likes || 0;

	return (
		<Link
			href={`/blog/${article.slug}`}
			className="flex flex-col rounded-lg p-2 group hover:bg-brand/10 duration-300"
		>
			<div className="text-xs font-medium text-secondary uppercase tracking-widest">
				<h3>{article.category}</h3>
			</div>
			<h2 className="font-medium group-hover:text-brand duration-300">{article.title}</h2>
			<div className="text-sm text-secondary">
				<span>{article.readingTime}</span>
				<span> • </span>
				<span>{views} views</span>
				<span> • </span>
				<span>{likes} likes</span>
			</div>
		</Link>
	);
}
