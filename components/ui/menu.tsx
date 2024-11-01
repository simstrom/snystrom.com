// import { links, navItems } from '@/lib/data';
// import { IconArrowDown, IconArrowUp, IconCommand, IconEnter } from '@/lib/icons';
// import { motion } from 'framer-motion';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import Kbd from './kbd';
// import MenuItem from './menuItem';

// interface MenuProps {
// 	className?: string;
// 	isOpen: boolean;
// 	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
// 	currentPath: string;
// }

// const containerVariant = {
// 	hidden: {
// 		opacity: 0,
// 		height: 0,
// 	},
// 	show: {
// 		opacity: 1,
// 		height: 'auto',
// 		transition: {
// 			type: 'spring',
// 			stiffness: 180,
// 			damping: 30,
// 			staggerChildren: 0.04,
// 		},
// 	},
// };

// const itemVariant = {
// 	hidden: { opacity: 0 },
// 	show: { opacity: 1 },
// };

// export default function Menu({ currentPath, isOpen, setIsOpen, className }: MenuProps) {
// const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
// const router = useRouter();

// useEffect(() => {
// 	const handleKeyboardShortcuts = (e: KeyboardEvent) => {
// 		switch (e.key) {
// 			case 'Escape':
// 				setIsOpen(false);
// 				break;
// 			case 'ArrowUp':
// 				e.preventDefault();
// 				setFocusedIndex((prevIndex) =>
// 					prevIndex === null ? links.length - 1 : (prevIndex + links.length - 1) % links.length
// 				);
// 				break;
// 			case 'ArrowDown':
// 				e.preventDefault();
// 				setFocusedIndex((prevIndex) => (prevIndex === null ? 0 : (prevIndex + 1) % links.length));
// 				break;
// 			case 'Enter':
// 				if (focusedIndex !== null) {
// 					setIsOpen(false);
// 					router.push(links[focusedIndex].path);
// 				}
// 				break;
// 			default:
// 				break;
// 		}
// 	};

// 	window.addEventListener('keydown', handleKeyboardShortcuts);
// 	return () => window.removeEventListener('keydown', handleKeyboardShortcuts);
// }, [focusedIndex]);

// 	return (

// 			<nav
// 				className="max-h-[80vh] overflow-y-auto pt-6 pb-3 sm:pb-2 px-2 sm:px-4 space-y-4 border-t"
// 				aria-label="Main navigation"
// 			>
// 				<div>
// 					<motion.h5
// 						variants={itemVariant}
// 						className="font-mono uppercase text-xs tracking-wide text-foreground-secondary px-2 mb-2"
// 					>
// 						Navigation
// 					</motion.h5>
// 					<ul>
// 						{navItems.navigationLinks.map((navItem, idx) => (
// 							<motion.li key={idx} variants={itemVariant}>
// 								<MenuItem
// 									navItem={navItem}
// 									idx={idx}
// 									setFocusedIndex={setFocusedIndex}
// 									setIsOpen={setIsOpen}
// 									isCurrentPath={`/${currentPath.split('/')[1]}` == navItem.path}
// 									isFocused={idx === focusedIndex ? true : false}
// 								/>
// 							</motion.li>
// 						))}
// 					</ul>
// 				</div>
// 				<div>
// 					<motion.h5
// 						variants={itemVariant}
// 						className="font-mono uppercase text-xs tracking-wide text-foreground-secondary px-2 mb-2"
// 					>
// 						Links
// 					</motion.h5>
// 					<ul>
// 						{[...navItems.otherLinks, ...navItems.socialLinks].map((navItem, idx) => (
// 							<motion.li key={idx} variants={itemVariant}>
// 								<MenuItem
// 									navItem={navItem}
// 									idx={idx + navItems.navigationLinks.length}
// 									setFocusedIndex={setFocusedIndex}
// 									setIsOpen={setIsOpen}
// 									isCurrentPath={currentPath == navItem.path}
// 									isFocused={idx + navItems.navigationLinks.length === focusedIndex ? true : false}
// 								/>
// 							</motion.li>
// 						))}
// 					</ul>
// 				</div>
// 			</nav>
// 	)
// }
