import { cn, slugify } from '@/lib/utils';
import Link from 'next/link';

export default function Tag({ tag, className }: { tag: string; className?: string }) {
	return (
		<Link
			href={`/blog/tag/${slugify(tag.toLowerCase())}`}
			className={cn(
				'inline-flex gap-1 items-center w-fit px-2 py-0.5 rounded-lg font-mono tracking-tighter text-sm hover:bg-brand-secondary/10 hover:text-brand cursor-pointer transition duration-300 ease-in-out',
				className
			)}
		>
			<span className="text-brand">#</span>
			{tag.toLowerCase()}
		</Link>
	);
}
