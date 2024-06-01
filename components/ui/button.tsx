import { IconArrowUpRight } from '@/lib/icons';
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
		link: 'w-fit h-fit text-xs group/link',
	};

	const sizeClasses = {
		default: 'h-14 px-12',
		small: 'h-10 px-8',
		icon: 'h-[38px] w-[38px]',
	};
	const variantClass = variantClasses[variant];
	const sizeClass = sizeClasses[size];
	const commonClass =
		'relative inline-flex items-center justify-center gap-x-2 font-mono tracking-tight text-sm';

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
				<IconArrowUpRight
					width={14}
					height={14}
					className="text-foreground-secondary group-hover/link:text-foreground group-hover/link:translate-x-1.5 group-hover/link:-translate-y-0.5 group-hover/link:scale-110 transition-transform duration-500"
				/>
				<span className="relative group-hover/link:translate-x-1.5 transition-transform duration-500">
					{children}
					<span className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand transition scale-x-0 origin-left group-hover/link:scale-x-100 duration-500" />
				</span>
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
