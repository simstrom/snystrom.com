import { cn, slugify } from '@/lib/utils';
import Link from 'next/link';

export default function Tag({ tag, className }: { tag: string; className?: string }) {
	return (
		<Link
			href={`/blog/tag/${slugify(tag.toLowerCase())}`}
			className={cn(
				'inline-flex items-center w-fit px-2 py-0.5 rounded-lg text-sm font-medium text-foreground-secondary hover:text-foreground cursor-pointer transition group',
				className
			)}
		>
			<span>#</span>
			{tag.toLowerCase()}
		</Link>
	);
}
