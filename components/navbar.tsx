'use client';

import { Logo } from '@/lib/icons';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navItems } from '@/lib/data';
import ThemeSwitcher from './ui/themeSwitcher';

export default function Navbar({ className }: { className?: string }) {
	const currentPath = usePathname();

	return (
		<header
			role="menubar"
			className={cn(
				'navbar pt-4 flex flex-col w-screen items-center fixed top-0 left-0 z-[99] dark:bg-gradient-to-b from-background/50 to-transparent transition-all',
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
					'flex items-center w-full h-12 max-w-screen-lg border rounded-xl px-4 backdrop-blur-md bg-background-secondary/80 dark:bg-background-secondary/60 border-border/10 dark:border-border/30'
				)}
			>
				<Link href="/" aria-label="Home" className="hover:opacity-80 transition-opacity p-2">
					<Logo width={20} height={20} aria-label="Logo" />
				</Link>

				<div className="h-7 border-l ml-4 mr-1 border-border/10 dark:border-border/30"></div>

				<div className="flex w-full h-full items-center text-foreground/80 text-sm font-medium tracking-normal">
					{navItems.navigationLinks.map((navItem, idx) => (
						<Link
							key={`navItem-${idx}`}
							href={navItem.path}
							className={cn(
								'relative px-4 py-3 rounded-lg hover:text-foreground transition-colors',
								`/${currentPath.split('/')[1]}` == navItem.path && 'text-foreground'
							)}
						>
							{navItem.name}
							{`/${currentPath.split('/')[1]}` == navItem.path && (
								<div className="h-0.5 absolute -bottom-[2px] left-0 right-0 bg-gradient-to-r from-transparent via-foreground to-transparent" />
							)}
						</Link>
					))}
				</div>

				<ThemeSwitcher className="ml-auto" />

				{/* <AnimatePresence>
							{menuOpen && (
								<Menu isOpen={menuOpen} setIsOpen={setMenuOpen} currentPath={currentPath} />
							)}
						</AnimatePresence> */}
			</nav>
		</header>
	);
}
