import { IconCheck, IconCross, IconInfo, IconWarning } from '@/lib/icons';
import { cn } from '@/lib/utils';

type CalloutProps = {
	variant?: 'info' | 'success' | 'warning' | 'danger';
	title?: string;
	children: React.ReactNode;
};

const variantConfig = {
	info: IconInfo,
	success: IconCheck,
	warning: IconWarning,
	danger: IconCross,
};

export default function Callout({ variant = 'info', title, children }: CalloutProps) {
	const Icon = variantConfig[variant];

	return (
		<aside
			data-callout={variant}
			className="callout p-4 my-5 rounded-xl text-foreground/70 border-2"
		>
			<div className="callout-title py-2 flex gap-x-3 items-start font-medium tracking-tight">
				<Icon width={24} height={24} className="flex-shrink-0 mt-1 text-[rgb(var(--callout))]" />
				<span className={cn('flex-grow not-prose', title && 'text-[rgb(var(--callout))]')}>
					{title ? title : children}
				</span>
			</div>
			<div className="callout-content not-prose px-1">{title && children}</div>
		</aside>
	);
}
