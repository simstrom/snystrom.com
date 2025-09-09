import { ContactModalContent } from '@/components/layouts/Navbar';
import MenuItem from '@/components/ui/MenuItem';
import Modal from '@/components/ui/Modal';

import { navItems } from '@/data/data';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface MobileMenuProps {
	className?: string;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	currentPath: string;
}

export default function MobileMenu({ currentPath, isOpen, setIsOpen, className }: MobileMenuProps) {
	return (
		<motion.div
			initial={{ height: 0 }}
			animate={{ height: 'auto' }}
			exit={{ height: 0 }}
			transition={{ duration: 0.2, ease: 'easeInOut' }}
			aria-expanded={isOpen}
			aria-label="Mobile navigation"
			className="sm:hidden overflow-hidden"
		>
			<div className="flex flex-col h-full pt-6 pb-10">
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
						.filter((item) => item.path)
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
					{navItems.connectLinks.map((navItem, idx) =>
						navItem.name === 'Contact' ? (
							<Modal
								key={idx}
								className="flex flex-col items-center gap-2"
								trigger={
									<MenuItem
										as="div"
										navItem={navItem}
										idx={idx}
										setIsOpen={setIsOpen}
										isCurrentPath={`/${currentPath.split('/')[1]}` == navItem.path}
									/>
								}
							>
								{ContactModalContent}
							</Modal>
						) : (
							<MenuItem
								key={idx}
								navItem={navItem}
								idx={idx}
								setIsOpen={setIsOpen}
								isCurrentPath={`/${currentPath.split('/')[1]}` == navItem.path}
							/>
						)
					)}
				</div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0, transition: { delay: 0, duration: 0 } }}
					transition={{ delay: 0.2, duration: 0 }}
					className={cn(
						'flex gap-x-5 fixed bottom-0 left-0 py-2 px-4 rounded-b-xl border-t w-full bg-background-secondary/20'
					)}
				>
					{navItems.socialLinks.map((navItem, idx) => (
						<a
							key={idx}
							href={navItem.path}
							target="_blank"
							rel="noopener noreferrer"
							className="p-2 text-foreground-secondary"
						>
							{navItem.icon}
						</a>
					))}
				</motion.div>
			</div>
		</motion.div>
	);
}
