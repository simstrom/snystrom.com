import { cn } from '@/lib/utils';

export default function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				'animate-pulse rounded-lg bg-foreground-secondary/10 dark:bg-foreground/10',
				className
			)}
			{...props}
		/>
	);
}
