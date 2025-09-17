import { IconBack } from '@/data/icons';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ComponentType, SVGProps } from 'react';

interface PageHeaderProps {
	title: string;
	content?: string;
	subtitle?: { text: string; Icon: ComponentType<SVGProps<SVGSVGElement>> };
	backlink?: string;
	className?: string;
}

export default function PageHeader({
	title,
	content,
	subtitle,
	backlink,
	className,
}: PageHeaderProps) {
	return (
		<>
			<div
				className={cn(
					'relative max-w-5xl mx-auto px-6 pt-40 pb-6 bg-background text-xl text-balance',
					className
				)}
			>
				<h1 className="mb-1">{title}</h1>
				{content && <p className="text-base max-w-4xl text-foreground-secondary">{content}</p>}
				{subtitle && (
					<div className="flex items-center gap-x-1 absolute top-34 left-6 text-brand text-sm font-medium">
						<subtitle.Icon />
						<span className="">{subtitle.text}</span>
					</div>
				)}

				{backlink && (
					<Link
						href={backlink}
						className="absolute top-20 left-6 w-fit p-2 rounded-full bg-foreground-secondary/5 text-foreground-secondary ring-1 ring-transparent ring-offset-background transition-all hover:bg-foreground-secondary/10 hover:text-foreground hover:ring-brand hover:ring-offset-2"
					>
						<IconBack className="w-5 h-5 rotate-180" />
					</Link>
				)}
			</div>
		</>
	);
}
