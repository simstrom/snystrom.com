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
			'text-primary-foreground bg-black/10 border border-border/20 rounded-xl shadow-shadow backdrop-blur-md hover:text-black/40 hover:border-transparent hover:bg-primary-foreground hover:shadow-glow',
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

	return (
		<button
			onClick={onClick}
			className={cn(
				'inline-flex items-center justify-center gap-x-2 transition duration-300',
				variantClass,
				sizeClass,
				className
			)}
		>
			{children}
		</button>
	);
}
