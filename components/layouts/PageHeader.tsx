import { cn } from '@/lib/utils';

interface PageHeaderProps {
	title: string;
	content?: string;
	subtitle?: string;
	className?: string;
}

export default function PageHeader({ title, content, subtitle, className }: PageHeaderProps) {
	return (
		<>
			<div
				className={cn(
					'relative max-w-5xl mx-auto px-6 pt-32 pb-12 bg-background-secondary text-balance',
					className
				)}
			>
				<h1 className="pb-2 text-3xl sm:text-5xl">{title}</h1>
				{content && <p className="text-lg max-w-4xl">{content}</p>}
				{subtitle && (
					<span className="block absolute top-26 left-6 ml-0.5 text-brand text-sm font-medium">
						{subtitle}
					</span>
				)}
			</div>
		</>
	);
}
