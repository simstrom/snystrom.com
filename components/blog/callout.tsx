import { IconCheck, IconInfo, IconMessage, IconWarning } from '@/lib/icons';

type CalloutProps = {
	variant?: 'info' | 'success' | 'thought' | 'warning';
	title?: string;
	children: React.ReactNode;
};

const variantConfig = {
	info: IconInfo,
	success: IconCheck,
	thought: IconMessage,
	warning: IconWarning,
};

export default function Callout({ variant = 'info', title, children }: CalloutProps) {
	const Icon = variantConfig[variant];

	return (
		<blockquote
			data-callout={variant}
			className="callout not-prose p-4 my-5 rounded-md text-foreground border shadow-sm"
		>
			<div className="py-2 flex gap-x-3 items-center font-medium">
				<Icon width={24} height={24} className="flex-shrink-0 text-[rgb(var(--callout))]" />
				<div className="flex-grow not-prose text-[rgb(var(--callout))]">
					{title ? title : variant.charAt(0).toUpperCase() + variant.slice(1)}
				</div>
			</div>
			<div className="px-1 not-prose text-foreground-secondary">{children}</div>
		</blockquote>
	);
}
