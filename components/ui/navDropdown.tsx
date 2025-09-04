'use client';

import { useFocusTrap } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

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
	imageSrc: string;
	imageAlt?: string;
	href?: string;
	onClose: () => void;
	colSpan?: number;
	rowSpan?: number;
	translateX?: number;
	className?: string;
}

export const NavDropDownCard = ({
	title,
	description,
	imageSrc,
	imageAlt = '',
	onClose,
	href,
	colSpan = 4,
	rowSpan = 1,
	translateX = 0,
	className,
}: NavDropDownCard) => {
	const Component = href ? Link : 'div';

	return (
		<Component
			{...(!href ? {} : { href })}
			onClick={!href ? undefined : onClose}
			className={cn(
				'relative flex flex-col overflow-hidden text-sm font-medium text-foreground p-4',
				'dark:hover:bg-[#181a20] transition-colors group',
				className
			)}
			style={{
				gridColumn: `span ${colSpan}`,
				gridRow: `span ${rowSpan}`,
			}}
		>
			<div className={cn('flex gap-x-2', rowSpan > 1 ? 'flex-col h-full' : 'items-baseline')}>
				<span className="z-20 relative">{title}</span>
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
			{imageSrc && (
				<Image
					fill
					sizes="200px"
					loading="lazy"
					src={imageSrc}
					alt={imageAlt}
					className={cn(
						'absolute inset-0 object-cover object-right grayscale',
						'group-hover:grayscale-0 transition'
					)}
					style={{
						transform: `translateX(${translateX}px)`,
						maskImage:
							'radial-gradient(circle at 100% 100%, rgba(255, 255, 255, 1) -50%, transparent 80%)',
						WebkitMaskImage:
							'radial-gradient(circle at 100% 100%, rgba(255, 255, 255, 1) -50%, transparent 80%)',
					}}
				/>
			)}
			<div
				className="z-10 absolute inset-0 pointer-events-none transition-opacity opacity-50 group-hover:opacity-0"
				style={{
					background:
						'linear-gradient(to bottom right, hsl(var(--background-secondary)) 0%, rgba(0,0,0,0) 200%)',
				}}
			/>
		</Component>
	);
};

export default { NavDropdown, NavDropDownCard };
