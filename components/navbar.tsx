'use client';

import { IconAt, IconCheck, IconCopy, IconEmail, IconMenu } from '@/lib/icons';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SITE_CONTACT } from '@/lib/constants';
import { dropdownLinks, navItems } from '@/lib/data';
import { useScrollLock } from '@/lib/hooks';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Copy from './ui/copy';
import MobileMenu from './ui/mobileMenu';
import Modal from './ui/modal';
import { NavDropdown, NavDropDownCard } from './ui/navDropdown';
import ThemeSwitcher from './ui/themeSwitcher';
import { Tooltip } from './ui/tooltip';

export default function Navbar({ className }: { className?: string }) {
	const [openMobile, setOpenMobile] = useState(false);
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);
	const currentPath = usePathname();
	useScrollLock(openMobile, true);

	const handleDropdownToggle = (dropdownId: string) => {
		setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
	};

	return (
		<header
			role="menubar"
			className={cn(
				'navbar flex flex-col w-full max-h-screen items-center fixed top-0 left-0 z-[99] shadow-lg',
				// 'before:absolute before:top-0 before:h-screen before:w-full before:bg-transparent before:invisible before-backdrop-blur-none before:transition-all',
				// (openMobile || openDropdown) &&
				// 	'before:visible before:backdrop-blur-md before:bg-foreground/10 dark:before:bg-background/50',
				// openMobile && 'sm:before:hidden',
				className
			)}
		>
			<nav
				onMouseLeave={() => setOpenDropdown(null)}
				aria-label="Main navigation"
				className={cn(
					'flex flex-col justify-center items-center w-full mx-auto max-h-screen border-b border-foreground dark:border-foreground/50 bg-background'
				)}
			>
				<div className="flex items-center w-full max-w-screen-lg border-x">
					<div className="flex w-full h-full items-center text-foreground-secondary text-sm font-medium tracking-normal">
						{navItems.navigationLinks.map((navItem, idx) => (
							<Link
								key={`navItem-${idx}`}
								href={navItem.path}
								onMouseOver={() => setOpenDropdown(null)}
								className={cn(
									'hidden sm:block text-center w-24 relative px-4 py-4 border-r hover:text-background hover:bg-foreground transition-colors',
									`/${currentPath.split('/')[1]}` == navItem.path && 'text-background bg-foreground'
								)}
							>
								{navItem.name}
							</Link>
						))}
						<button
							onMouseOver={() => setOpenDropdown('explore')}
							onClick={() => handleDropdownToggle('explore')}
							className={cn(
								'hidden sm:block text-center w-24 relative px-4 py-4 border-r hover:text-background hover:bg-foreground transition-colors',
								openDropdown === 'explore' && 'text-background bg-foreground'
							)}
						>
							Explore
						</button>
					</div>

					<div className="ml-auto flex" onMouseOver={() => setOpenDropdown(null)}>
						<Tooltip message="Theme">
							<ThemeSwitcher className="px-4 py-4 h-[52px] hover:text-background hover:bg-foreground transition-colors border-x" />
						</Tooltip>
						<Tooltip message="Contact" className="hidden sm:flex">
							<Modal
								trigger={<IconAt width={18} height={18} />}
								triggerClassName="px-4 py-4 h-[52px] hover:text-background hover:bg-foreground transition-colors"
								className="flex flex-col items-center gap-2"
							>
								{ContactModalContent}
							</Modal>
						</Tooltip>

						<button
							onClick={() => setOpenMobile(!openMobile)}
							aria-expanded={openMobile}
							aria-controls="sliding-menu"
							aria-label={openMobile ? 'Close menu' : 'Open menu'}
							className={cn(
								'sm:hidden p-2 rounded-md text-foreground-secondary transition-colors',
								'hover:text-foreground hover:bg-foreground-secondary/10 dark:hover:bg-foreground/10',
								openMobile && 'bg-foreground-secondary/10  dark:bg-foreground/10 text-foreground'
							)}
						>
							<IconMenu isOpen={openMobile} />
						</button>
						<span className="sr-only">{openMobile ? 'Close menu' : 'Open menu'}</span>
					</div>
				</div>

				<AnimatePresence>
					{openDropdown === 'explore' && (
						<NavDropdown isOpen={openDropdown === 'explore'} onClose={() => setOpenDropdown(null)}>
							{dropdownLinks.map((item) => (
								<NavDropDownCard
									key={item.name}
									title={item.name}
									description={item.description}
									href={item.path}
									imageSrc={item.image ?? ''}
									colSpan={item.colSpan}
									rowSpan={item.rowSpan}
									translateX={item.translateX}
									onClose={() => setOpenDropdown(null)}
								/>
							))}
						</NavDropdown>
					)}
				</AnimatePresence>

				<AnimatePresence>
					{openMobile && (
						<MobileMenu isOpen={openMobile} setIsOpen={setOpenMobile} currentPath={currentPath} />
					)}
				</AnimatePresence>
			</nav>
		</header>
	);
}

export const ContactModalContent = (
	<div className="flex flex-col">
		<div className="pt-8 pb-6 px-6 sm:px-8">
			<h3 className="text-3xl mb-2">Get in touch</h3>
			<p className="text-foreground-secondary">
				Design engineer with 4+ years of experience in crafting applications, interfaces and
				experiences.
			</p>
		</div>
		<div className="flex items-center w-full border-y">
			<div className="flex flex-col grow text-foreground border-r py-3 px-6 sm:px-8 text-[15px] bg-background">
				<div className="flex items-center gap-x-2 text-[13px] text-foreground-secondary">
					<IconEmail width={15} height={15} />
					Email
				</div>
				{SITE_CONTACT}
			</div>
			<Copy
				toCopy={SITE_CONTACT}
				successMessage={<IconCheck width={28} height={28} />}
				hiddenClassName="left-auto bottom-auto"
				variant="grow"
				className="relative h-full flex items-center justify-center px-6 bg-background text-foreground transition-colors hover:text-background hover:bg-foreground"
			>
				<IconCopy width={20} height={20} />
			</Copy>
		</div>
		<div className="mt-auto flex items-center justify-center gap-4 py-4 text-foreground-secondary">
			{navItems.socialLinks.map((link) => (
				<a
					key={link.name}
					href={link.path}
					target="_blank"
					rel="noopener noreferrer"
					className="bg-background hover:text-background hover:bg-foreground rounded-xl transition-colors p-2"
				>
					{link.icon}
				</a>
			))}
		</div>
	</div>
);
