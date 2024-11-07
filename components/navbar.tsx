'use client';

import { IconMenu, Logo } from '@/lib/icons';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { dropdownLinks, navItems } from '@/lib/data';
import { useScrollLock } from '@/lib/hooks';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import MobileMenu from './ui/mobileMenu';
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
					'before:visible before:backdrop-blur-md before:bg-black/30 dark:before:bg-background/50',
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
					'flex flex-col justify-center w-full sm:w-fit max-w-screen-lg max-h-screen border rounded-xl px-4 py-2 sm:py-1 backdrop-blur-md bg-background/80'
				)}
			>
				<div className="flex items-center w-full">
					<Link href="/" aria-label="Home" className="hover:opacity-80 transition-opacity p-2">
						<Logo width={20} height={20} aria-label="Logo" />
					</Link>

					<div className="hidden sm:block h-7 border-l ml-4 mr-1 border-border/10 dark:border-border/30"></div>

					<div className="flex w-full h-full items-center text-foreground/80 text-sm font-medium tracking-normal">
						{navItems.navigationLinks.map((navItem, idx) => (
							<Link
								key={`navItem-${idx}`}
								href={navItem.path}
								onMouseEnter={() => setOpenDropdown(null)}
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
							onMouseEnter={() => setOpenDropdown('explore')}
							onClick={() => handleDropdownToggle('explore')}
							className={cn(
								'hidden sm:block relative px-4 py-3 rounded-lg hover:text-foreground transition-colors',
								openDropdown === 'explore' && 'text-foreground'
							)}
						>
							Explore
						</button>
					</div>

					<div className="ml-6 flex gap-x-1">
						<Tooltip message="Theme">
							<ThemeSwitcher />
						</Tooltip>
						<button
							onClick={() => setOpenMobile(!openMobile)}
							aria-expanded={openMobile}
							aria-controls="sliding-menu"
							aria-label={openMobile ? 'Close menu' : 'Open menu'}
							className={cn(
								'sm:hidden p-2 rounded-full text-foreground/80 transition-colors',
								'hover:text-foreground hover:bg-background-secondary dark:hover:bg-foreground/10 ',
								openMobile && 'bg-background-secondary  dark:bg-foreground/10 text-foreground'
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
