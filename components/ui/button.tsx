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
			'button bg-transparent rounded-lg backdrop-blur-sm hover:text-brand transition duration-300 ease-in-out',
		secondary: '',
		ghost: '',
		link: '',
	};
	const sizeClasses = {
		default: 'h-14 px-12',
		small: 'h-10 px-8',
		icon: 'h-[38px] w-[38px]',
	};
	const variantClass = variantClasses[variant];
	const sizeClass = sizeClasses[size];

	return (
		<button
			onClick={onClick}
			className={cn(
				'relative overflow-hidden inline-flex items-center justify-center gap-x-2',
				variantClass,
				sizeClass,
				className
			)}
		>
			{children}
		</button>
	);
}
