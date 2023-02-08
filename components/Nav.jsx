import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import avatar from '../public/images/avatar.jpg';
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
		<header className="sticky top-0 z-20 backdrop-blur bg-primary/70 border-b border-primary/50">
			<nav className="max-w-3xl mx-auto px-6 md:px-8 flex justify-between items-center py-3 sm:py-2">
				<MobileNav links={links} />
				<Link href="/" className="shrink-0">
					<Image
						src={avatar}
						alt="Simon Nyström avatar"
						width={36}
						height={36}
						priority
						className="hidden sm:block rounded-full hover:scale-110 transition:transform duration-300"
					/>
				</Link>
				<ul className="hidden sm:flex items-center gap-1">
					{links.map((link) => (
						<li key={link.label}>
							<NavItem href={link.href} label={link.label} />
						</li>
					))}
				</ul>

				<button
					role="button"
					className="p-2 text-tertiary rounded-lg hover:text-brand hover:bg-tertiary dark:hover:bg-tertiary/40 transition duration-300"
					onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
				>
					{theme === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
				</button>
			</nav>
		</header>
	);
}
