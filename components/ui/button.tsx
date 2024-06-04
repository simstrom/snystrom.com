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
	href?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	className?: string;
}

export default function Button({
	children,
	variant = 'primary',
	size = 'default',
	isExternalLink,
	href,
	onClick,
	className,
	...props
}: ButtonProps) {
	const variantClasses = {
		primary:
			'uppercase tracking-normal button hover:text-brand transition duration-300 ease-in-out',
		secondary: '',
		ghost: '',
		link: 'items-center gap-x-1 font-mono text-xs tracking-tight hover:text-brand transition duration-300 group',
	};

	const sizeClasses = {
		default: 'h-14 px-12',
		small: 'h-10 px-8',
		icon: 'h-[38px] w-[38px]',
	};
	const variantClass = variantClasses[variant];
	const sizeClass = sizeClasses[size];
	const commonClass =
		'relative inline-flex w-fit items-center justify-center gap-x-2 font-mono tracking-tight text-sm';

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
				<span className="group-hover:translate-x-1 transition-transform duration-300">
					{children}
				</span>
				<IconArrowRight
					width={14}
					height={14}
					className="text-foreground-secondary group-hover:text-brand group-hover:translate-x-1.5 transition-transform duration-300"
				/>
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
