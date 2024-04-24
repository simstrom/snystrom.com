import { cn } from '@/lib/utils';
import { Suspense } from 'react';

export default function ViewCounter({ views, className }: { views: number; className?: string }) {
	return (
		<div className={cn('inline-flex items-center gap-x-2', className)}>
			<Suspense fallback={<>...</>}>{views || 0}</Suspense> views
		</div>
	);
}
