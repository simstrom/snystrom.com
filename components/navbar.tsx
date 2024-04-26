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
	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const pathName = usePathname();

	const { scrollY } = useScroll();
	const [prevScrollY, setPrevScrollY] = useState(0);

	useMotionValueEvent(scrollY, 'change', (latest) => {
		if (latest <= 0) {
			setVisible(true);
		} else if (latest > prevScrollY && latest > 50) {
			setVisible(false);
		} else if (prevScrollY - latest > 1) {
			setVisible(true);
		}
		setPrevScrollY(latest);
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
					transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}
					role="menubar"
					className={cn(
						'navbar flex justify-center fixed top-0 sm:top-6 inset-x-0 z-[99]',
						className
					)}
				>
					<div
						ref={menuRef}
						className="max-w-3xl w-full flex flex-col sm:mx-3 md:mx-0 border-b sm:border bg-background-tertiary/50 sm:rounded-xl backdrop-blur shadow-shadow"
					>
						<div className="flex justify-between items-center w-full py-3 px-4 sm:px-6">
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
									className="hover:text-brand active:scale-95 transition"
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
								<ThemeSwitcher />
								<Button
									size="icon"
									onClick={() => setMenuOpen(!menuOpen)}
									aria-label="Toggle menu"
									className={cn(
										'active:scale-95',
										menuOpen &&
											'focus-visible:outline-none text-brand after:border-brand after:border-2'
									)}
								>
									<IconCommand />
								</Button>
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
