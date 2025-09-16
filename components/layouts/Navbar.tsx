'use client';

import { dropdownLinks, navItems } from '@/data/data';
import { IconAt, IconMenu, Logo } from '@/data/icons';
import { useScrollLock } from '@/lib/hooks';
import { cn } from '@/lib/utils';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import ContactModal from '../sections/ContactModal';
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
						className="h-13 w-13 border-r flex items-center justify-center transition-colors hover:text-foreground hover:bg-white/30 dark:hover:bg-background-secondary"
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
									'hidden sm:block text-center w-24 relative px-4 py-4 border-r hover:text-foreground hover:bg-white/30 dark:hover:bg-background-secondary transition-colors',
									`/${currentPath.split('/')[1]}` == navItem.path &&
										'text-foreground bg-white/30 dark:bg-background-secondary'
								)}
							>
								{navItem.name}
							</Link>
						))}
						<button
							onMouseOver={() => setOpenDropdown('explore')}
							onClick={() => handleDropdownToggle('explore')}
							className={cn(
								'hidden sm:block text-center w-24 relative px-4 py-4 hover:text-foreground hover:bg-white/30 dark:hover:bg-background-secondary transition-colors',
								openDropdown === 'explore' &&
									'text-foreground bg-white/30 dark:bg-background-secondary'
							)}
						>
							Explore
						</button>
					</div>

					<div className="flex" onMouseOver={() => setOpenDropdown(null)}>
						<Tooltip message="Theme">
							<ThemeSwitcher className="px-4 py-4 h-[52px] border-l hover:text-foreground hover:bg-white/30 dark:hover:bg-background-secondary transition-colors" />
						</Tooltip>

						<Tooltip message="Contact" className="hidden sm:flex">
							<Modal
								trigger={<IconAt width={18} height={18} />}
								triggerClassName="px-4 py-4 h-[52px] border-l hover:text-foreground hover:bg-white/30 dark:hover:bg-background-secondary transition-colors"
							>
								<ContactModal />
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
										icon={item.icon}
										colSpan={item.colSpan}
										rowSpan={item.rowSpan}
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
