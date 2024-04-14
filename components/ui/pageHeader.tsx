import { cn } from '@/lib/utils';

interface PageHeaderProps {
	title: string;
	content: string;
	className?: string;
}

export default function PageHeader({ title, content, className }: PageHeaderProps) {
	return (
		<section
			className={cn(
				'w-full flex flex-col sm:flex-row sm:items-end sm:space-x-5 gap-y-3',
				className
			)}
		>
			<h1 className="text-5xl sm:text-7xl font-serif w-fit sm:border-r border-border/10 sm:pr-5 tracking-tight">
				{title}
			</h1>
			<p className="flex-1 text-primary-foreground">{content}</p>
		</section>
	);
}
