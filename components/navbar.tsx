'use client';

import { IconCommand } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import Button from './ui/button';
import Menu from './ui/menu';
import ThemeSwitcher from './ui/themeSwitcher';

export default function Navbar({ className }: { className?: string }) {
	const [visible, setVisible] = useState(true);
	const [isScrolled, setIsScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const pathName = usePathname();
	const isStartPage = pathName == '/';
	const { scrollY } = useScroll();

	useMotionValueEvent(scrollY, 'change', (latest) => {
		if (latest < 10) {
			// setVisible(true);
			setIsScrolled(false);
		} else if (scrollY.getVelocity() > 0 && latest > 10) {
			setIsScrolled(true);
			// if (latest > 200) setVisible(false);
		} else if (scrollY.getVelocity() < 0) {
			// setVisible(true);
		}
	});

	useEffect(() => {
		const handleToggleMenu = (e: KeyboardEvent) => {
			const { key, metaKey } = e;
			const isMetaKey = key === 'k' && metaKey;

			if (isMetaKey) {
				setMenuOpen((prev) => !prev);
				return;
			}
		};

		const handleClickOutside = (e: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setMenuOpen(false);
			}
		};

		window.addEventListener('keydown', handleToggleMenu);
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			window.removeEventListener('keydown', handleToggleMenu);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [menuOpen]);

	useEffect(() => {
		if (!visible) setMenuOpen(false);
	}, [visible, menuOpen]);

	return (
		<>
			<AnimatePresence initial={false}>
				<motion.header
					initial={{ y: 0 }}
					exit={{ y: -100 }}
					animate={{ y: visible ? 0 : -100 }}
					transition={{ type: 'spring', stiffness: 300, damping: 30 }}
					role="menubar"
					className={cn(
						'navbar flex w-screen py-10 justify-center fixed top-0 left-0 z-[99] border-b border-transparent transition-all duration-500 ease-in-out',
						isScrolled && 'bg-background/70 backdrop-blur-md py-3 border-b-border/20',
						isStartPage && !isScrolled && 'py-6',
						className
					)}
				>
					<div
						ref={menuRef}
						className={cn(
							'w-full px-4 lg:px-2 lg:pr-6 max-w-screen-lg flex flex-col transition-all duration-500 ease-in-out',
							isStartPage && 'max-w-[90vw]',
							isStartPage && isScrolled && 'max-w-screen-lg'
						)}
					>
						<div className={cn('flex justify-between items-center w-full')}>
							<Link
								href="/"
								onClick={() => pathName != '/' && setMenuOpen(false)}
								aria-label="Home"
							>
								<svg
									width="28"
									height="28"
									viewBox="0 0 44 44"
									fill="none"
									aria-label="Logo"
									className={cn(
										'w-8 h-8 hover:text-brand active:scale-95 origin-bottom transition-all duration-500 ease-in-out',
										isScrolled && 'w-7 h-7'
									)}
								>
									<motion.path
										key="logo"
										initial={{ pathLength: 0 }}
										animate={{ pathLength: 1 }}
										transition={{
											type: 'spring',
											stiffness: 50,
											damping: 20,
										}}
										strokeDasharray="0, 1"
										d="M34.845 6.86401C24.2671 -4.26593 -1.32035 4.50812 2.35873 25.0049C2.8661 27.8315 6.33052 28.5367 8.33831 26.4834L15.0279 19.6422C16.1408 18.5041 17.9487 18.4333 19.1472 19.4808L24.9259 24.5317C26.035 25.5011 27.6838 25.5219 28.8169 24.5808L36.4377 18.2515C38.4871 16.5494 41.6121 17.3302 41.8982 19.9788C43.539 35.168 25.037 50.0697 9.01668 36.964"
										stroke="currentColor"
										strokeWidth="3"
										strokeLinecap="round"
									/>
								</svg>
							</Link>

							<div className="flex gap-x-2">
								<Button
									size="icon"
									onClick={() => setMenuOpen(!menuOpen)}
									aria-label="Toggle menu"
									className={cn(
										'active:scale-95 text-foreground-secondary',
										menuOpen &&
											'focus-visible:outline-none text-brand after:border-brand after:border-2'
									)}
								>
									<IconCommand />
								</Button>
								<ThemeSwitcher />
							</div>
						</div>

						<AnimatePresence>
							{menuOpen && (
								<Menu isOpen={menuOpen} setIsOpen={setMenuOpen} currentPath={pathName} />
							)}
						</AnimatePresence>
					</div>
				</motion.header>

				{/* OVERLAY ON OPEN*/}
				<AnimatePresence key={'overlay'}>
					{menuOpen && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="fixed block top-0 left-0 w-screen min-h-screen bg-background-secondary/50 backdrop-blur-sm z-10"
						/>
					)}
				</AnimatePresence>
			</AnimatePresence>
		</>
	);
}
