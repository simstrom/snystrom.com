import { IconCheck, IconInfo, IconMessage, IconWarning } from '@/data/icons';
import { cn } from '@/lib/utils';

type CalloutVariants = 'info' | 'success' | 'thought' | 'warning';
interface CalloutProps {
	variant?: CalloutVariants;
	title?: string;
	children: React.ReactNode;
}

const variantConfig = {
	info: IconInfo,
	success: IconCheck,
	thought: IconMessage,
	warning: IconWarning,
};

const variantStyles: Record<CalloutVariants, { border: string; bg: string; text: string }> = {
	info: {
		border: 'border-[#2e68ef]/25 dark:border-[#6694ff]/25',
		bg: 'bg-[#2e68ef]/10 dark:bg-[#6694ff]/10',
		text: 'text-[#2e68ef] dark:text-[#6694ff]',
	},
	success: {
		border: 'border-[#3d7150]/25 dark:border-[#63c981]/25',
		bg: 'bg-[#3d7150]/10 dark:bg-[#63c981]/10',
		text: 'text-[#3d7150] dark:text-[#63c981]',
	},
	thought: {
		border: 'border-[#5f38ca]/25 dark:border-[#8978d6]/25',
		bg: 'bg-[#5f38ca]/10 dark:bg-[#8978d6]/10',
		text: 'text-[#5f38ca] dark:text-[#8978d6]',
	},
	warning: {
		border: 'border-[#a53f47]/25 dark:border-[#e06c76]/25',
		bg: 'bg-[#a53f47]/10 dark:bg-[#e06c76]/10',
		text: 'text-[#a53f47] dark:text-[#e06c76]',
	},
};

export default function Callout({ variant = 'info', title, children }: CalloutProps) {
	const Icon = variantConfig[variant];
	const styles = variantStyles[variant];

	return (
		<blockquote
			className={cn(
				'not-prose p-4 my-5 rounded-md border shadow-sm',
				styles.bg,
				styles.border,
				styles.text
			)}
		>
			<div className="py-2 flex gap-x-3 items-center font-medium">
				<Icon width={24} height={24} className={cn('shrink-0', styles.text)} />
				<div className="grow not-prose">
					{title ? title : variant.charAt(0).toUpperCase() + variant.slice(1)}
				</div>
			</div>
			<div className="px-1 not-prose text-foreground-secondary">{children}</div>
		</blockquote>
	);
}
