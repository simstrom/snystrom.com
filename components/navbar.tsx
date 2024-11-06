'use client';

import { IconMenu, Logo } from '@/lib/icons';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navItems } from '@/lib/data';
import { useScrollLock } from '@/lib/hooks';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Dropdown from './ui/dropdown';
import Menu from './ui/menu';
import ThemeSwitcher from './ui/themeSwitcher';
import { Tooltip } from './ui/tooltip';

export default function Navbar({ className }: { className?: string }) {
	const [isOpen, setIsOpen] = useState(false);
	const currentPath = usePathname();
	useScrollLock(isOpen);

	return (
		<header
			role="menubar"
			className={cn(
				'navbar py-2 sm:pt-4 px-3 flex flex-col w-screen max-h-screen items-center fixed top-0 left-0 z-[99] dark:bg-gradient-to-b from-background/50 to-transparent before:transition',
				isOpen &&
					'sm:before:hidden before:content-[""] before:absolute before:top-0 before:h-screen before:w-full before:backdrop-blur-sm',
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
											isOpen && 'opacity-0'
										)}
									/>
								)}
							</Link>
						))}
						<div
							onMouseEnter={() => setIsOpen(!isOpen)}
							className={cn(
								'hidden sm:block relative px-4 py-3 rounded-lg hover:text-foreground transition-colors'
							)}
						>
							Explore
						</div>
					</div>

					<div className="ml-6 flex gap-x-1">
						<Tooltip message="Theme">
							<ThemeSwitcher />
						</Tooltip>
						<button
							onClick={() => setIsOpen(!isOpen)}
							aria-expanded={isOpen}
							aria-controls="sliding-menu"
							aria-label={isOpen ? 'Close menu' : 'Open menu'}
							className={cn(
								'sm:hidden p-2 rounded-full text-foreground/80 transition-colors',
								'hover:text-foreground hover:bg-background-secondary dark:hover:bg-foreground/10 ',
								isOpen && 'bg-background-secondary  dark:bg-foreground/10 text-foreground'
							)}
						>
							<IconMenu isOpen={isOpen} />
						</button>
						<span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
					</div>
				</div>

				<AnimatePresence>
					{isOpen && <Dropdown isOpen={isOpen} setIsOpen={setIsOpen} />}
				</AnimatePresence>
				<AnimatePresence>
					{isOpen && <Menu isOpen={isOpen} setIsOpen={setIsOpen} currentPath={currentPath} />}
				</AnimatePresence>
			</nav>
		</header>
	);
}
