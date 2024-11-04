import { navItems } from '@/lib/data';
import { motion } from 'framer-motion';
import MenuItem from './menuItem';

interface MenuProps {
	className?: string;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	currentPath: string;
}

export default function Menu({ currentPath, isOpen, setIsOpen, className }: MenuProps) {
	return (
		<motion.div
			initial={{ height: 0 }}
			animate={{ height: '91vh' }}
			exit={{ height: 0 }}
			transition={{ duration: 0.2, ease: 'easeInOut' }}
			aria-expanded={isOpen}
			aria-label="Mobile navigation"
			className="overflow-hidden"
		>
			<div className="flex flex-col h-full pt-8 pb-2">
				<h5 className="font-mono uppercase text-xs tracking-wide text-foreground-secondary px-2 mb-2">
					Navigation
				</h5>
				<ul>
					{navItems.navigationLinks.map((navItem, idx) => (
						<li key={idx}>
							<MenuItem
								navItem={navItem}
								idx={idx}
								setIsOpen={setIsOpen}
								isCurrentPath={`/${currentPath.split('/')[1]}` == navItem.path}
							/>
						</li>
					))}
				</ul>

				<ul className="mt-auto flex gap-x-4">
					{[...navItems.otherLinks, ...navItems.socialLinks].map((navItem, idx) => (
						<li key={idx} role="menuitem">
							{navItem.icon}
						</li>
					))}
				</ul>
			</div>
		</motion.div>
	);
}
