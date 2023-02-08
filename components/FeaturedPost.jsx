import cn from 'clsx';
import Link from 'next/link';
import { formatDate } from '../lib/formatDate';

export default function FeaturedPost({ article, gradientFrom, gradientTo }) {
	return (
		<Link
			href={`/blog/${article.fields.slug}`}
			className={cn(
				'w-full rounded-xl p-1 text-lg hover:scale-105 hover:drop-shadow-lg duration-300',
				'bg-gradient-to-r',
				gradientFrom,
				gradientTo
			)}
		>
			<div className="flex flex-col gap-2 sm:gap-16 px-6 py-6 sm:py-8 w-full h-full rounded-lg bg-primary">
				<div className="flex flex-col gap-1">
					<h5 className="text-xs tracking-widest font-medium text-secondary uppercase">
						{article.fields.category}
					</h5>
					{article.fields.title}
				</div>
				<div className="mt-auto flex gap-2 sm:flex-col sm:gap-0 text-sm">
					<div className="order-2 sm:order-1 text-secondary">
						{formatDate(article.sys.createdAt)}
					</div>
					<div className="order-1 sm:order-2 font-medium text-tertiary">
						{article.fields.readingTime}
					</div>
				</div>
			</div>
		</Link>
	);
}
