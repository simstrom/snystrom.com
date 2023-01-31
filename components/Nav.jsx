import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import Link from 'next/link';
import avatar from '../public/avatar.jpg';
import { DarkModeIcon, LightModeIcon } from './Icons';
import MobileNav from './MobileNav';
import NavItem from './NavItem';

const links = [
	{ label: 'Home', href: '/' },
	{ label: 'About', href: '/about' },
	{ label: 'Projects', href: '/projects' },
	{ label: 'Blog', href: '/blog' },
	{ label: 'Gallery', href: '/gallery' },
];

export default function Nav() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	// Make sure theme is loaded
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<header className="sticky top-0 z-10 backdrop-blur-md flex flex-col justify-center items-center w-full px-8 bg-gray-100/70 dark:bg-gray-900/70 transition-colors duration-300">
			<nav className="flex justify-between items-center max-w-3xl w-full py-2 font-medium">
				<MobileNav links={links} />
				<Link href="/" className="shrink-0">
					<Image
						src={avatar}
						alt="Simon Nyström avatar"
						width={36}
						height={36}
						className="rounded-full hover:scale-110 transition"
					/>
				</Link>
				<ul className="hidden sm:flex items-center gap-1 text-sm">
					{links.map((link) => (
						<li key={link.href}>
							<NavItem href={link.href} label={link.label} />
						</li>
					))}
				</ul>

				<div
					role="button"
					className="rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900  dark:hover:text-gray-100 transition-colors duration-300"
					onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
				>
					{theme === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
				</div>
			</nav>
		</header>
	);
}
