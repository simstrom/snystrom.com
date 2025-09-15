'use client';

import { SITE_CONTACT } from '@/data/constants';
import { dropdownLinks, navItems } from '@/data/data';
import { IconAt, IconCheck, IconCopy, IconEmail, IconMenu, Logo } from '@/data/icons';
import { useScrollLock } from '@/lib/hooks';
import { cn } from '@/lib/utils';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import Copy from '../ui/Copy';
import Modal from '../ui/Modal';
import ThemeSwitcher from '../ui/ThemeSwitcher';
import { Tooltip } from '../ui/Tooltip';
import MobileMenu from './MobileMenu';
import { NavDropdown, NavDropDownCard } from './NavDropdown';

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
				'navbar max-w-[1088px] w-full mx-auto flex flex-col max-h-screen items-center fixed top-0 z-99',
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
					'flex flex-col justify-center items-center w-full mx-auto max-h-screen border-b backdrop-blur-xl z-10'
				)}
			>
				<div className="flex items-center justify-between w-full mx-auto border-x bg-background/90">
					<Link
						href="/"
						className="h-13 w-13 border-r flex items-center justify-center transition-colors hover:text-background hover:bg-foreground"
					>
						<Logo width={20} height={20} className="" />
					</Link>

					<div className="flex w-fit h-full justify-center items-center border-x text-foreground-secondary text-sm font-medium tracking-normal">
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
								'hidden sm:block text-center w-24 relative px-4 py-4 hover:text-background hover:bg-foreground transition-colors',
								openDropdown === 'explore' && 'text-background bg-foreground'
							)}
						>
							Explore
						</button>
					</div>

					<div className="flex" onMouseOver={() => setOpenDropdown(null)}>
						<Tooltip message="Theme">
							<ThemeSwitcher className="px-4 py-4 h-[52px] border-l hover:text-background hover:bg-foreground transition-colors" />
						</Tooltip>

						<Tooltip message="Contact" className="hidden sm:flex">
							<Modal
								trigger={<IconAt width={18} height={18} />}
								triggerClassName="px-4 py-4 h-[52px] border-l hover:text-background hover:bg-foreground transition-colors"
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
						<>
							<NavDropdown
								isOpen={openDropdown === 'explore'}
								onClose={() => setOpenDropdown(null)}
							>
								{dropdownLinks.map((item, idx) => (
									<NavDropDownCard
										key={item.name}
										title={item.name}
										description={item.description}
										href={item.path}
										imageSrc={item.image}
										colSpan={item.colSpan}
										rowSpan={item.rowSpan}
										translateX={item.translateX}
										onClose={() => setOpenDropdown(null)}
										className={cn(
											idx === 0
												? 'border-b-0'
												: (idx !== 0 || idx !== dropdownLinks.length - 1) && 'border-r-0'
										)}
									/>
								))}
							</NavDropdown>
						</>
					)}
				</AnimatePresence>

				<AnimatePresence>
					{openMobile && (
						<MobileMenu isOpen={openMobile} setIsOpen={setOpenMobile} currentPath={currentPath} />
					)}
				</AnimatePresence>
			</nav>

			<AnimatePresence>
				{openDropdown === 'explore' && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
						className="fixed w-screen h-screen z-0 bg-background/50 backdrop-blur-lg"
					></motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}

export const ContactModalContent = (
	<div className="flex flex-col">
		<div className="pt-8 pb-6 px-6 sm:px-8">
			<h3 className="text-3xl mb-2">Get in touch</h3>
			<p className="text-foreground-secondary">
				Whether you have a question, want to collaborate, or just want to say hi, my inbox is always
				open.
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
					className="hover:text-background hover:bg-foreground rounded-xl transition-colors p-2"
				>
					{link.icon}
				</a>
			))}
		</div>
	</div>
);
