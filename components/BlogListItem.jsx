import Link from 'next/link';

export default function BlogListItem({ href, title, summary }) {
	return (
		<Link href={href} className="flex flex-col rounded-lg p-2 group hover:bg-brand/10 duration-300">
			<div className="text-xs font-medium text-secondary uppercase tracking-widest">
				<h3>Productivity</h3>
			</div>
			<h2 className="font-medium group-hover:text-brand duration-300">{title}</h2>
			<div className="text-sm text-secondary">
				<span>2 min read</span>
				<span> • </span>
				<span>234 views</span>
			</div>
		</Link>
	);
}
