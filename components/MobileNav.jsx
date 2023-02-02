import cn from 'clsx';
import { useEffect, useState } from 'react';
import styles from '../styles/mobile-nav.module.css';

import { CloseIcon, EmailIcon, GithubIcon, HamburgerIcon, LinkedInIcon } from './Icons';
import LinkCard from './LinkCard';
import NavItem from './NavItem';

export default function MobileNav({ links }) {
	const [open, setOpen] = useState(false);
	const [rendered, setRendered] = useState(false);

	const toggleMenu = () => {
		setOpen(!open);
	};

	//Delay render of Social Links
	useEffect(() => {
		setTimeout(() => {
			setRendered(open);
		}, 300);
	}, [open]);

	return (
		<>
			<div
				role="button"
				className={cn(styles.burger, 'sm:hidden z-10 ml-2 text-gray-600 dark:text-gray-400')}
				onClick={toggleMenu}
			>
				<HamburgerIcon data-hide={open} />
				<CloseIcon data-hide={!open} />
			</div>

			<div
				className={cn(
					styles.menu,
					'flex flex-col px-6 bg-gray-100 dark:bg-gray-900',
					open ? styles.menuOpen : styles.menuClosed
				)}
			>
				<ul className="mt-20 flex flex-col w-full mb-8">
					{links.map((link) => (
						<li
							key={link.href}
							className="py-4 border-b border-black-opaque-100 dark:border-gray-opaque-100 text-base"
							onClick={toggleMenu}
						>
							<NavItem href={link.href} label={link.label} />
						</li>
					))}
				</ul>

				<ul className="mt-auto flex flex-col gap-4 text-sm font-medium mb-4">
					<li>
						<LinkCard href="mailto:simons.nystrom@gmail.com" icon={<EmailIcon />}>
							Send an Email
						</LinkCard>
					</li>
					<li>
						<LinkCard href="https://www.linkedin.com/in/simon-nystrom/" icon={<LinkedInIcon />}>
							Connect on LinkedIn
						</LinkCard>
					</li>
					<li>
						<LinkCard href="https://github.com/simstrom" icon={<GithubIcon />}>
							Browse my Github
						</LinkCard>
					</li>
				</ul>
			</div>
		</>
	);
}
