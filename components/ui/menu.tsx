import { navItems } from '@/lib/data';
import { cn } from '@/lib/utils';
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
			className="sm:hidden overflow-auto"
		>
			<div className="flex flex-col h-full pt-8 pb-4">
				<h5 className="text-xs tracking-wide text-foreground-secondary px-2 pb-1 mb-1 border-b">
					Navigate
				</h5>
				<div className="grid grid-cols-2 gap-y-2 mb-8">
					{navItems.navigationLinks.map((navItem, idx) => (
						<MenuItem
							key={idx}
							navItem={navItem}
							idx={idx}
							setIsOpen={setIsOpen}
							isCurrentPath={`/${currentPath.split('/')[1]}` == navItem.path}
						/>
					))}
				</div>
				<h5 className="text-xs tracking-wide text-foreground-secondary px-2 pb-1 mb-1 border-b">
					Explore
				</h5>
				<div className="grid grid-cols-2 gap-y-2 mb-8">
					{navItems.exploreLinks
						.filter((link) => !link.upcoming)
						.map((navItem, idx) => (
							<MenuItem
								key={idx}
								navItem={navItem}
								idx={idx}
								setIsOpen={setIsOpen}
								isCurrentPath={`/${currentPath.split('/')[1]}` == navItem.path}
							/>
						))}
				</div>

				<h5 className="text-xs tracking-wide text-foreground-secondary px-2 pb-1 mb-1 border-b">
					Connect
				</h5>
				<div className="grid gap-y-2 pb-12">
					{navItems.connectLinks.map((navItem, idx) => (
						<MenuItem
							key={idx}
							navItem={navItem}
							idx={idx}
							setIsOpen={setIsOpen}
							isCurrentPath={`/${currentPath.split('/')[1]}` == navItem.path}
						/>
					))}
				</div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0, transition: { delay: 0, duration: 0 } }}
					transition={{ delay: 0.2, duration: 0 }}
					className={cn(
						'flex gap-x-5 fixed bottom-0 left-0 pb-1 pt-2 px-4 rounded-b-xl border-t w-full bg-background-secondary/20 backdrop-blur-md'
					)}
				>
					{navItems.socialLinks.map((navItem, idx) => (
						<a
							key={idx}
							href={navItem.path}
							target="_blank"
							rel="noopener noreferrer"
							className="p-2 text-foreground/90"
						>
							{navItem.icon}
						</a>
					))}
				</motion.div>
			</div>
		</motion.div>
	);
}
