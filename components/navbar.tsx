'use client';
import { NavItem, navItems } from '@/lib/data';
import {
	IconArrowNarrowDown,
	IconArrowNarrowUp,
	IconArrowReturn,
	IconArrowRight,
	IconCommand,
} from '@/lib/icons';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import ThemeSwitcher from './ui/themeSwitcher';

export default function Navbar({ className }: { className?: string }) {
	const [visible, setVisible] = useState(true);
	const [menuOpen, setMenuOpen] = useState(false);
	const [activeLinkIndex, setActiveLinkIndex] = useState<number | null>(0);
	const router = useRouter();

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

	const containerVariant = {
		hidden: {
			opacity: 0,
			height: 0,
		},
		show: {
			opacity: 1,
			height: 'auto',
			transition: {
				type: 'spring',
				stiffness: 100,
				damping: 20,
				staggerChildren: 0.05,
			},
		},
	};

	const itemVariant = {
		hidden: { opacity: 0 },
		show: { opacity: 1 },
	};

	useEffect(() => {
		const handleKeys = (e: KeyboardEvent) => {
			if (e.key === 'k' && e.metaKey) {
				setMenuOpen((prev) => !prev);
			}
			if (menuOpen) {
				if (e.key === 'Escape') {
					setMenuOpen(false);
				} else if (e.key === 'ArrowUp') {
					e.preventDefault();
					setActiveLinkIndex((prevIndex) =>
						prevIndex === null || prevIndex === 0
							? navItems.navigation.length + navItems.other.length + navItems.socials.length - 1
							: prevIndex - 1
					);
				} else if (e.key === 'ArrowDown') {
					e.preventDefault();
					setActiveLinkIndex((prevIndex) =>
						prevIndex === null ||
						prevIndex ===
							navItems.navigation.length + navItems.other.length + navItems.socials.length - 1
							? 0
							: prevIndex + 1
					);
				} else if (e.key === 'Enter' && activeLinkIndex !== null) {
					router.push(navItems.navigation[activeLinkIndex].path);
				}
			}
		};

		window.addEventListener('keydown', handleKeys);

		return () => window.removeEventListener('keydown', handleKeys);
	}, [menuOpen, navItems.navigation, activeLinkIndex]);

	useEffect(() => {
		if (!visible) setMenuOpen(false);
		if (!menuOpen) setActiveLinkIndex(null);
	}, [visible, menuOpen]);

	return (
		<>
			<AnimatePresence initial={false}>
				<motion.header
					initial={{
						opacity: 1,
						y: 0,
					}}
					exit={{
						opacity: 0,
						y: -100,
					}}
					animate={{
						opacity: visible ? 1 : 0,
						y: visible ? 0 : -100,
					}}
					transition={{
						duration: 0.2,
					}}
					className={cn(
						'flex justify-center fixed top-4 sm:top-6 inset-x-0 mx-auto z-[99]',
						className
					)}
					role="banner"
				>
					<div className="max-w-xl w-full flex flex-col mx-4 border border-border/10 bg-white/5 rounded-2xl backdrop-blur shadow-shadow">
						<div className="flex justify-between items-center w-full py-3 px-4 sm:px-6">
							<Link href="/" className="">
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
								<button
									aria-label="Toggle menu"
									className={cn(
										'p-2 text-primary-foreground bg-black/5 border border-border/20 rounded-xl shadow-shadow backdrop-blur transition duration-300 active:scale-90',
										'hover:text-black/20 hover:border-transparent hover:bg-primary-foreground hover:shadow-glow',
										menuOpen && 'focus-visible:outline-none'
									)}
									onClick={() => setMenuOpen(!menuOpen)}
								>
									<IconCommand />
								</button>
								<ThemeSwitcher />
							</div>
						</div>

						<AnimatePresence>
							{menuOpen && (
								<motion.div
									variants={containerVariant}
									initial="hidden"
									animate="show"
									exit="hidden"
									tabIndex={-1}
								>
									<nav
										className="max-h-[80vh] overflow-y-auto pt-6 pb-3 sm:pb-2 px-2 sm:px-4 space-y-4 border-t border-border/20"
										aria-label="Main navigation"
										aria-expanded={menuOpen}
									>
										<div className="">
											<motion.h5
												variants={itemVariant}
												className="font-medium text-sm tracking px-2 mb-2"
											>
												Navigation
											</motion.h5>
											<ul>
												{navItems.navigation.map((navItem: NavItem, idx: number) => (
													<motion.li key={`navlink=${idx}`} variants={itemVariant}>
														<Link
															href={navItem.path}
															className={cn(
																'text-sm flex items-center gap-x-3 px-2 py-3 rounded-lg hover:bg-gray-800',
																idx === activeLinkIndex && 'bg-gray-800'
															)}
															onMouseEnter={() => setActiveLinkIndex(idx)}
															onMouseLeave={() => setActiveLinkIndex(null)}
															onClick={() => setMenuOpen(false)}
														>
															{navItem.icon ? navItem.icon : <IconArrowRight width={16} />}
															<span>{navItem.name}</span>

															{idx === activeLinkIndex && (
																<div className="ml-auto px-0.5 shadow-sm bg-primary/10 text-primary rounded">
																	<IconArrowReturn width={16} />
																</div>
															)}
														</Link>
													</motion.li>
												))}
											</ul>
										</div>
										<div className="">
											<motion.h5
												variants={itemVariant}
												className="font-medium text-sm tracking px-2 mb-2"
											>
												Links
											</motion.h5>
											<ul>
												{navItems.other.map((navItem: NavItem, idx: number) => (
													<motion.li key={`otherLink=${idx}`} variants={itemVariant}>
														<Link
															href={navItem.path}
															className={cn(
																'text-sm flex items-center gap-x-4 px-2 py-3 hover:bg-gray-800 rounded-lg',
																idx + navItems.navigation.length === activeLinkIndex &&
																	'bg-gray-800'
															)}
															onMouseEnter={() =>
																setActiveLinkIndex(idx + navItems.navigation.length)
															}
															onMouseLeave={() => setActiveLinkIndex(null)}
														>
															{navItem.icon ? navItem.icon : <IconArrowRight width={14} />}
															<span>{navItem.name}</span>

															{idx + navItems.navigation.length === activeLinkIndex && (
																<div className="ml-auto px-0.5 shadow-sm bg-primary/10 text-primary rounded">
																	<IconArrowReturn width={16} />
																</div>
															)}
														</Link>
													</motion.li>
												))}
												{navItems.socials.map((navItem: NavItem, idx: number) => (
													<motion.li key={`socialLink=${idx}`} variants={itemVariant}>
														<Link
															href={navItem.path}
															className={cn(
																'w-full text-sm flex items-center gap-x-4 px-2 py-3 hover:bg-gray-800 rounded-lg',
																idx + navItems.navigation.length + navItems.other.length ===
																	activeLinkIndex && 'bg-gray-800'
															)}
															onMouseEnter={() =>
																setActiveLinkIndex(
																	idx + navItems.navigation.length + navItems.other.length
																)
															}
															onMouseLeave={() => setActiveLinkIndex(null)}
														>
															{navItem.icon ? (
																navItem.icon
															) : (
																<IconArrowRight width={14} className="text-muted" />
															)}
															<span>{navItem.name}</span>

															{idx + navItems.navigation.length + navItems.other.length ===
																activeLinkIndex && (
																<div className="ml-auto px-0.5 shadow-sm bg-primary/10 text-primary rounded">
																	<IconArrowReturn width={16} />
																</div>
															)}
														</Link>
													</motion.li>
												))}
											</ul>
										</div>
									</nav>
									<motion.div
										variants={itemVariant}
										className="hidden sm:flex py-3 px-4 sm:px-6 gap-8 items-center text-sm font-sans font-normal text-foreground/70 border-t border-border/20 select-none"
									>
										<div className="flex items-center gap-x-2">
											Menu
											<kbd className="px-1.5 py-0.5 inline-flex space-x-1.5 items-center text-center text-sm font-sans font-normal shadow-sm bg-primary/10 text-primary rounded">
												<abbr title="Command" className="font-sans no-underline leading-none">
													<IconCommand width={12} />
												</abbr>
												<span>K</span>
											</kbd>
										</div>
										<div className="flex items-center gap-x-2">
											Theme
											<kbd className="px-1.5 py-0.5 inline-flex space-x-1.5 items-center text-center text-sm font-sans font-normal shadow-sm bg-primary/10 text-primary rounded">
												<abbr title="Command" className="font-sans no-underline leading-none">
													<IconCommand width={12} />
												</abbr>
												<span>B</span>
											</kbd>
										</div>
										<div className="flex items-center gap-x-2">
											Navigate
											<kbd className="px-1 py-0.5 inline-flex space-x-1.5 items-center text-center text-sm font-sans font-normal shadow-sm bg-primary/10 text-primary rounded">
												<IconArrowNarrowUp width={18} />
											</kbd>
											<span>/</span>
											<kbd className="px-1 py-0.5 inline-flex space-x-1.5 items-center text-center text-sm font-sans font-normal shadow-sm bg-primary/10 text-primary rounded">
												<IconArrowNarrowDown width={18} />
											</kbd>
										</div>
										<div className="flex items-center gap-x-2">
											Open
											<kbd className="px-1 py-0.5 inline-flex space-x-1.5 items-center text-center text-sm font-sans font-normal shadow-sm bg-primary/10 text-primary rounded">
												<IconArrowReturn width={18} />
											</kbd>
										</div>
									</motion.div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</motion.header>
			</AnimatePresence>
		</>
	);
}
