import { cn } from '@/lib/utils';

interface PageHeaderProps {
	title: string;
	content?: string;
	className?: string;
}

export default function PageHeader({ title, content, className }: PageHeaderProps) {
	return (
		<>
			<div className={cn('max-w-5xl mx-auto px-6 text-balance', className)}>
				<h1 className="pb-2 text-3xl sm:text-5xl">{title}</h1>
				{content && <p className="text-lg">{content}</p>}
			</div>
		</>
	);
}
