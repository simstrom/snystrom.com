import cn from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { CloseIcon, EmailIcon, GithubIcon, HamburgerIcon, LinkedInIcon } from './Icons';
import LinkCard from './LinkCard';
import NavItem from './NavItem';

export default function MobileNav({ links }) {
	const [open, setOpen] = useState(false);

	const toggleMenu = () => {
		setOpen(!open);
	};

	const itemVariants = {
		closed: {
			opacity: 0,
		},
		open: {
			opacity: 1,
		},
	};
	const menuVariants = {
		closed: {
			transition: {
				staggerChildren: 0.1,
				staggerDirection: -1,
			},
		},
		open: {
			transition: {
				staggerChildren: 0.1,
				staggerDirection: 1,
			},
		},
	};

	return (
		<>
			<motion.button
				className="sm:hidden z-10 ml-2 text-tertiary"
				onClick={toggleMenu}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
			>
				{!open ? <HamburgerIcon /> : <CloseIcon />}
			</motion.button>

			<AnimatePresence>
				{open && (
					<motion.div
						// className={cn(
						// 	styles.menu,
						// 	'flex flex-col px-6 bg-primary',
						// 	open ? styles.menuOpen : styles.menuClosed
						// )}
						className={cn('menu', 'flex flex-col px-6 bg-primary')}
						initial={{ width: 0, opacity: 0 }}
						animate={{ width: '100vw', opacity: 1 }}
						transition={{ duration: 0.3 }}
						exit={{ opacity: 0, width: 0, transition: { delay: 0.3, duration: 0.3 } }}
					>
						<motion.ul
							className="mt-20 flex flex-col w-full mb-8"
							variants={menuVariants}
							initial="closed"
							animate="open"
							exit="closed"
						>
							{links.map((link) => (
								<motion.li
									key={link.href}
									className="py-4 border-b border-primary"
									onClick={toggleMenu}
									variants={itemVariants}
								>
									<NavItem href={link.href} label={link.label} />
								</motion.li>
							))}
						</motion.ul>

						<motion.ul
							className="mt-auto flex flex-col gap-4 mb-4"
							variants={itemVariants}
							initial="closed"
							animate="open"
							transition={{ delay: 0.3 }}
							exit={{ opacity: 0, transition: { delay: 0 } }}
						>
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
						</motion.ul>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
