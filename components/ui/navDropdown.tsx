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
			role="menu"
			aria-label="Dropdown"
			className="overflow-hidden"
			onMouseLeave={onClose}
		>
			<div
				ref={focusRef}
				tabIndex={-1}
				className="py-2 w-full grid grid-cols-12 auto-rows-fr gap-2"
			>
				{children}
			</div>
		</motion.div>
	);
};

interface NavDropDownCard {
	title: string;
	imageSrc: string;
	imageAlt?: string;
	href: string;
	onClose: () => void;
	colSpan?: number;
	rowSpan?: number;
	translateX?: number;
	className?: string;
}

export const NavDropDownCard = ({
	title,
	imageSrc,
	imageAlt = '',
	onClose,
	href,
	colSpan = 8,
	rowSpan = 3,
	translateX = 0,
	className,
}: NavDropDownCard) => {
	return (
		<Link
			href={href}
			onClick={onClose}
			className={cn(
				'relative overflow-hidden text-[13px] font-medium text-foreground p-4 rounded-xl',
				'bg-background-secondary dark:bg-background-tertiary',
				'dark:hover:bg-[#181a20] transition duration-300 group',
				className
			)}
			style={{
				gridColumn: `span ${colSpan}`,
				gridRow: `span ${rowSpan}`,
			}}
		>
			<span className="z-20 relative">{title}</span>
			<Image
				fill
				sizes="330px"
				loading="lazy"
				src={imageSrc}
				alt={imageAlt}
				className={cn(
					'absolute w-full inset-0 rounded-xl object-cover object-left grayscale',
					'group-hover:grayscale-0 transition duration-300'
				)}
				style={{
					transform: `translateX(${translateX}px)`,
					maskImage:
						'radial-gradient(circle at 100% 100%, rgba(255, 255, 255, 1) -50%, transparent 80%)',
					WebkitMaskImage:
						'radial-gradient(circle at 100% 100%, rgba(255, 255, 255, 1) -50%, transparent 80%)',
				}}
			/>
			<div
				className="z-10 absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 opacity-50 group-hover:opacity-0"
				style={{
					background:
						'linear-gradient(to bottom right, hsl(var(--background-tertiary)) 0%, rgba(0,0,0,0) 200%)',
				}}
			/>
		</Link>
	);
};

export default { NavDropdown, NavDropDownCard };
