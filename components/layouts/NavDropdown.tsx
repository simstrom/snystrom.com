'use client';

import { useFocusTrap } from '@/lib/hooks';
import { cn } from '@/lib/utils';

import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { ComponentType, SVGProps } from 'react';
import CardOverlay from '../ui/CardOverlay';

interface NavDropdown {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	className?: string;
}

export const NavDropdown = ({ isOpen, onClose, children, className }: NavDropdown) => {
	const { focusRef } = useFocusTrap(isOpen, onClose, true);

	return (
		<motion.div
			initial={{ height: 0 }}
			animate={{ height: 'auto' }}
			exit={{ height: 0 }}
			transition={{ duration: 0.2, ease: 'easeInOut' }}
			aria-expanded={isOpen}
			aria-label="Dropdown"
			className="overflow-hidden w-full border-t shadow-sm"
			onMouseLeave={onClose}
		>
			<div
				ref={focusRef}
				tabIndex={-1}
				className="w-full max-w-[1088px] mx-auto grid grid-cols-12 auto-rows-fr border-x outline-none bg-background/95 divide-x divide-y"
			>
				{children}
			</div>
		</motion.div>
	);
};

interface NavDropDownCard {
	title: string;
	description?: string;
	icon?: ComponentType<SVGProps<SVGSVGElement>>;
	href?: string;
	onClose: () => void;
	colSpan?: number;
	rowSpan?: number;
	className?: string;
}

export const NavDropDownCard = ({
	title,
	description,
	icon: Icon,
	onClose,
	href = '',
	colSpan = 4,
	rowSpan = 1,
	className,
}: NavDropDownCard) => {
	return (
		<Link
			href={href || ''}
			onClick={!href ? undefined : onClose}
			className={cn(
				'relative overflow-hidden text-sm font-medium text-foreground p-4',
				'hover:bg-background-secondary transition-colors group',
				!href && 'cursor-default',
				className
			)}
			style={{
				gridColumn: `span ${colSpan}`,
				gridRow: `span ${rowSpan}`,
			}}
		>
			<div className={cn('flex gap-x-2', rowSpan > 1 ? 'flex-col h-full' : 'items-center')}>
				<div className="flex items-center gap-2">
					{Icon && <Icon />}
					<h3 className="tracking-normal z-20 relative">{title}</h3>
				</div>
				{description && (
					<span
						className={cn(
							'text-[13px] text-foreground-secondary',
							rowSpan == 1 ? 'truncate' : 'mt-1',
							colSpan >= 6 && rowSpan > 1 && 'w-1/2'
						)}
					>
						{description}
					</span>
				)}
				{!href && (
					<div className="absolute top-0 right-0 text-xs rounded-bl-md px-4 py-1 backdrop-blur-lg border-l border-b border-brand/20 text-brand/80 bg-brand/10 z-10 w-fit">
						Upcoming
					</div>
				)}
			</div>
			{Icon && rowSpan > 1 && (
				<Icon
					className={cn(
						'w-80 h-80 absolute -bottom-12 -right-12 -rotate-12 text-foreground-secondary/5 dark:text-black/20',
						'transition-colors duration-300 pointer-events-none select-none'
					)}
				/>
			)}
			<CardOverlay withIcon />
		</Link>
	);
};

export default { NavDropdown, NavDropDownCard };
