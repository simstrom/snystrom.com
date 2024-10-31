import { cn } from '@/lib/utils';

interface PageHeaderProps {
	title: string;
	content: string;
	className?: string;
}

export default function PageHeader({ title, content, className }: PageHeaderProps) {
	return (
		<section className={cn('w-full mx-auto space-y-2', className)}>
			<h1 className="text-3xl">{title}</h1>
			<p className="text-foreground-secondary text-pretty">{content}</p>
		</section>
	);
}

{
	/* LARGE

<section
className={cn(
	'flex flex-col px-2 w-full md:flex-row md:items-end md:space-x-5 gap-y-3',
	className
)}
>
<h1 className="text-5xl sm:text-6xl lg:text-8xl tracking-tight w-fit md:border-r-2 md:pr-5">
	{title}
</h1>
<p className="flex-1 text-foreground-secondary text-pretty lg:text-balance sm:text-lg lg:text-xl">
	{content}
</p>
</section> */
}
