import { IconArrowRight } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';
import { HTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'default' | 'small' | 'icon';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
	children: React.ReactNode;
	variant?: ButtonVariant;
	size?: ButtonSize;
	isExternalLink?: boolean;
	backLink?: boolean;
	href?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	className?: string;
}

export default function Button({
	children,
	variant = 'primary',
	size = 'default',
	isExternalLink,
	backLink = false,
	href,
	onClick,
	className,
	...props
}: ButtonProps) {
	const variantClasses = {
		primary:
			'uppercase button hover:text-brand transition ease-in-out after:bg-background/80 z-10 after:-z-1',
		secondary: '',
		ghost: '',
		link: 'items-end font-medium group',
	};

	const sizeClasses = {
		default: 'h-14 px-12',
		small: 'h-10 px-8',
		icon: 'h-[38px] w-[38px]',
	};
	const variantClass = variantClasses[variant];
	const sizeClass = sizeClasses[size];
	const commonClass = 'relative inline-flex w-fit items-center justify-center gap-x-2 text-sm';

	if (isExternalLink) {
		return (
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				{...props}
				className={cn(commonClass, variantClass, sizeClass, className)}
			>
				{children}
			</a>
		);
	} else if (variant === 'link') {
		return (
			<Link href={href as Url} {...props} className={cn(commonClass, variantClass, className)}>
				{backLink ? (
					<>
						<IconArrowRight className="rotate-180" />
						{children}
					</>
				) : (
					<>
						{children}
						<IconArrowRight />
					</>
				)}
			</Link>
		);
	} else if (href) {
		return (
			<Link {...props} href={href} className={cn(commonClass, variantClass, sizeClass, className)}>
				{children}
			</Link>
		);
	} else {
		return (
			<button
				{...props}
				onClick={onClick}
				className={cn(commonClass, variantClass, sizeClass, className)}
			>
				{children}
			</button>
		);
	}
}
