import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'default' | 'small' | 'icon';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
	children?: React.ReactNode;
	variant?: ButtonVariant;
	size?: ButtonSize;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	className?: string;
}

export default function Button({
	children,
	variant = 'primary',
	size = 'default',
	onClick,
	className,
}: ButtonProps) {
	const variantClasses = {
		primary:
			'btn bg-background-secondary/5 dark:bg-background-secondary/50 border rounded-xl backdrop-blur-md hover:text-foreground-inverse after:bg-brand',
		secondary: '',
		ghost: '',
		link: '',
	};
	const sizeClasses = {
		default: 'h-14 px-12',
		small: 'h-10 px-8',
		icon: 'h-10 w-10',
	};
	const variantClass = variantClasses[variant];
	const sizeClass = sizeClasses[size];
	/* <button class="button-57" role="button"><span class="text">Button 57</span><span>Alternate text</span></button> */
	return (
		<button
			onClick={onClick}
			className={cn(
				'relative overflow-hidden inline-flex items-center justify-center',
				variantClass,
				sizeClass,
				className
			)}
		>
			<span className="inline-flex items-center justify-center gap-x-2">{children}</span>
			{variantClasses[variant] == variantClasses.primary && (
				<span className="inline-flex items-center justify-center gap-x-2">{children}</span>
			)}
		</button>
	);
}
