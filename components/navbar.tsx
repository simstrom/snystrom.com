'use client';

import { IconAt, IconCheck, IconCopy, IconEmail, IconMenu, Logo } from '@/lib/icons';
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
				'navbar py-2 sm:pt-4 px-3 flex flex-col w-screen max-h-screen items-center fixed top-0 left-0 z-[99] dark:bg-gradient-to-b from-background/50 to-transparent transition-all duration-300',
				'before:absolute before:top-0 before:h-screen before:w-full before:bg-transparent before:invisible before-backdrop-blur-none before:transition-all before:duration-300',
				(openMobile || openDropdown) &&
					'before:visible before:backdrop-blur-md before:bg-foreground/10 dark:before:bg-background/50',
				openMobile && 'sm:before:hidden',
				className
			)}
		>
			<div
				className="h-10 w-full blur-xl absolute top-0 dark:bg-gradient-to-b from-background/50 to-transparent opacity-50"
				aria-hidden="true"
			/>
			<nav
				aria-label="Main navigation"
				className={cn(
					'flex flex-col justify-center w-full sm:max-w-screen-sm max-h-screen border rounded-xl px-4 py-2 sm:py-1 backdrop-blur-md bg-background/80'
				)}
			>
				<div className="flex items-center w-full">
					<Link
						href="/"
						aria-label="Home"
						className="p-2 rounded-md hover:text-foreground hover:bg-foreground-secondary/10 dark:hover:bg-foreground/10 transition-colors"
					>
						<Logo width={18} height={18} aria-label="Logo" />
					</Link>

					<div className="hidden sm:block h-8 border-l ml-3 border-border/10 dark:border-border/30"></div>

					<div className="mx-2 flex w-fit h-full items-center text-foreground/80 text-sm font-medium tracking-normal">
						{navItems.navigationLinks.map((navItem, idx) => (
							<Link
								key={`navItem-${idx}`}
								href={navItem.path}
								onMouseOver={() => setOpenDropdown(null)}
								className={cn(
									'hidden sm:block relative px-4 py-3 rounded-lg hover:text-foreground transition-colors',
									`/${currentPath.split('/')[1]}` == navItem.path && 'text-foreground'
								)}
							>
								{navItem.name}
								{`/${currentPath.split('/')[1]}` == navItem.path && (
									<div
										className={cn(
											'h-0.5 absolute -bottom-[5px] left-0 right-0 bg-gradient-to-r from-transparent via-foreground to-transparent transition-opacity',
											openDropdown && 'opacity-0'
										)}
									/>
								)}
							</Link>
						))}
						<button
							onMouseOver={() => setOpenDropdown('explore')}
							onClick={() => handleDropdownToggle('explore')}
							className={cn(
								'hidden sm:block relative px-4 py-3 rounded-lg hover:text-foreground transition-colors',
								openDropdown === 'explore' && 'text-foreground'
							)}
						>
							Explore
						</button>
					</div>

					<div className="ml-auto flex gap-x-2" onMouseOver={() => setOpenDropdown(null)}>
						<Tooltip message="Theme">
							<ThemeSwitcher />
						</Tooltip>
						<Tooltip message="Contact" className="hidden sm:flex">
							<Modal
								trigger={<IconAt width={18} height={18} />}
								triggerClassName="p-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-foreground-secondary/10 dark:hover:bg-foreground/10 transition-colors"
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
								'sm:hidden p-2 rounded-md text-foreground/80 transition-colors',
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
									imageSrc={item.image}
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
	<>
		<div className="p-2 rounded-lg bg-brand shadow-sm">
			<Logo width={32} height={32} className="text-foreground-inverse dark:text-foreground" />
		</div>
		<div className="mt-2 text-center">
			<h3 className="text-xl mb-1">Get in touch</h3>
			<p className="text-foreground/80 px-4">
				Design engineer with 4+ years of experience in crafting applications, interfaces and
				experiences.
			</p>
		</div>
		<div className="flex items-center w-full gap-2 mt-6">
			<div className="flex flex-col grow text-foreground py-3 px-4 text-[15px] bg-background border rounded-lg">
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
				className="relative h-full flex items-center justify-center bg-brand/80 text-foreground-inverse dark:text-foreground px-4 sm:px-6 rounded-lg transition-colors duration-200 hover:bg-brand/70 hover:text-foreground-inverse dark:hover:text-foreground"
			>
				<IconCopy width={20} height={20} />
			</Copy>
		</div>
		<div className="flex items-center gap-4 mt-6 text-foreground-secondary">
			{navItems.socialLinks.map((link) => (
				<a
					key={link.name}
					href={link.path}
					target="_blank"
					rel="noopener noreferrer"
					className="hover:text-foreground transition-colors p-2 rounded-sm"
				>
					{link.icon}
				</a>
			))}
		</div>
	</>
);
