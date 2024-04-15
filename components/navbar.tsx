'use client';

import { links, navItems } from '@/lib/data';
import { IconCommand } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import Button from './ui/button';
import Menu from './ui/menu';
import ThemeSwitcher from './ui/themeSwitcher';
import Tooltip from './ui/tooltip';

export default function Navbar({ className }: { className?: string }) {
	const [visible, setVisible] = useState(true);
	const [menuOpen, setMenuOpen] = useState(false);
	const [activeLinkIndex, setActiveLinkIndex] = useState<number | null>(0);
	const menuRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const pathName = usePathname();

	const { scrollY } = useScroll();
	const [prevScrollY, setPrevScrollY] = useState(0);

	useMotionValueEvent(scrollY, 'change', (latest) => {
		if (latest <= 0) {
			setVisible(true);
		} else if (latest > prevScrollY) {
			setVisible(false);
		} else {
			setVisible(true);
		}
		setPrevScrollY(latest);
	});

	useEffect(() => {
		const handleKeys = (e: KeyboardEvent) => {
			const { key, metaKey } = e;
			const isMetaKey = key === 'k' && metaKey;

			if (isMetaKey) {
				setMenuOpen((prev) => !prev);
				return;
			}
			if (!menuOpen) return;

			switch (key) {
				case 'Escape':
					setMenuOpen(false);
					break;
				case 'ArrowUp':
					e.preventDefault();
					setActiveLinkIndex((prevIndex) =>
						prevIndex === null || prevIndex === 0 ? links.length - 1 : prevIndex - 1
					);
					break;
				case 'ArrowDown':
					e.preventDefault();
					setActiveLinkIndex((prevIndex) =>
						prevIndex === null || prevIndex === links.length - 1 ? 0 : prevIndex + 1
					);
					break;
				case 'Enter':
					if (activeLinkIndex !== null) {
						setMenuOpen(false);
						router.push(links[activeLinkIndex].path);
					}
					break;
				default:
					break;
			}
		};

		const handleClickOutside = (e: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setMenuOpen(false);
			}
		};

		window.addEventListener('keydown', handleKeys);
		document.addEventListener('mousedown', handleClickOutside);

		return () => window.removeEventListener('keydown', handleKeys);
	}, [menuOpen, activeLinkIndex, router]);

	useEffect(() => {
		// Close menu when navbar is hidden
		if (!visible) setMenuOpen(false);
		// Reset arrow navigated linkIndex when menu is closed
		if (!menuOpen) setActiveLinkIndex(null);
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
						'flex justify-center fixed top-4 sm:top-6 inset-x-0 mx-auto z-[99]',
						className
					)}
				>
					<div
						ref={menuRef}
						className="max-w-xl w-full flex flex-col mx-4 border border-border/10 bg-white/5 rounded-2xl backdrop-blur-md shadow-shadow"
					>
						<div className="flex justify-between items-center w-full py-3 px-4 sm:px-6">
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
							<div className="flex gap-x-4">
								<ThemeSwitcher />
								<Tooltip label={`${menuOpen ? 'Hide' : 'Show'} command center`}>
									<Button
										size="icon"
										onClick={() => setMenuOpen(!menuOpen)}
										aria-label="Toggle menu"
										className={cn(
											'active:scale-90',
											menuOpen &&
												'focus-visible:outline-none text-black/40 border-transparent bg-primary-foreground shadow-glow'
										)}
									>
										<IconCommand />
									</Button>
								</Tooltip>
							</div>
						</div>

						<AnimatePresence>
							{menuOpen && (
								<Menu
									isOpen={menuOpen}
									setIsOpen={setMenuOpen}
									activeLinkIndex={activeLinkIndex}
									setActiveLinkIndex={setActiveLinkIndex}
									navItems={navItems}
								/>
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
							className="fixed top-0 left-0 w-screen min-h-screen bg-background/20 backdrop-blur-sm z-10"
						/>
					)}
				</AnimatePresence>
			</AnimatePresence>
		</>
	);
}
