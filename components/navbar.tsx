'use client';

import { IconCommand, IconSearch } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import Button from './ui/button';
import Menu from './ui/menu';
import ThemeSwitcher from './ui/themeSwitcher';
import Tooltip from './ui/tooltip';

export default function Navbar({ className }: { className?: string }) {
	const [visible, setVisible] = useState(true);
	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
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

		if (menuOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [visible, menuOpen]);

	return (
		<>
			<AnimatePresence initial={false}>
				<motion.header
					initial={{ y: 0 }}
					exit={{ y: -100 }}
					animate={{ y: visible ? 0 : -100 }}
					transition={{ duration: 0.2 }}
					role="menubar"
					className={cn(
						'flex justify-center fixed top-0 sm:top-6 inset-x-0 mx-auto z-[99]',
						className
					)}
				>
					<div
						ref={menuRef}
						className="max-w-screen-sm w-full flex flex-col sm:mx-3 border-b sm:border bg-background/50 sm:bg-background/30 sm:rounded-2xl backdrop-blur-md shadow-shadow"
					>
						<div className="flex justify-between items-center w-full py-3 px-4 sm:px-6">
							{!menuOpen ? (
								<Link href="/" onClick={() => pathName != '/' && setMenuOpen(false)}>
									<Image
										src="/images/avatar.jpg"
										alt="Simon Nyström avatar"
										width={32}
										height={32}
										priority
										className="rounded-full active:scale-90 transition"
									/>
								</Link>
							) : (
								<motion.div
									initial={{ opacity: 0 }}
									exit={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3 }}
									className="inline-flex items-center flex-1"
								>
									<label htmlFor="search" className="w-8 h-8 pr-1 flex items-center justify-center">
										<IconSearch />
									</label>
									<input
										ref={inputRef}
										autoComplete="off"
										id="search"
										type="text"
										placeholder="Type some keywords to start searching..."
										className="px-5 w-full h-full bg-transparent focus-visible:outline-none"
									></input>
								</motion.div>
							)}

							<div className="flex gap-x-3">
								<ThemeSwitcher />
								<Tooltip label={`${menuOpen ? 'Hide' : 'Show'} command center`}>
									<Button
										size="icon"
										onClick={() => setMenuOpen(!menuOpen)}
										aria-label="Toggle menu"
										className={cn(
											'active:scale-90',
											menuOpen &&
												'focus-visible:outline-none text-background/50 border-transparent bg-foreground shadow-glow'
										)}
									>
										<IconCommand />
									</Button>
								</Tooltip>
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
							className="fixed top-0 left-0 w-screen min-h-screen bg-background/30 backdrop-blur-sm z-10"
						/>
					)}
				</AnimatePresence>
			</AnimatePresence>
		</>
	);
}
