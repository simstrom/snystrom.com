import { NavItem, Navigation } from '@/lib/data';
import { IconArrowDown, IconArrowUp, IconCommand, IconEnter } from '@/lib/icons';
import { motion } from 'framer-motion';
import Kbd from './kbd';
import MenuItem from './menuItem';

interface MenuProps {
	className?: string;
	navItems: Navigation;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	activeLinkIndex: number | null;
	setActiveLinkIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

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

const renderMenuItems = (navItems: NavItem[], props: MenuProps, startIdx: number = 0) => {
	return navItems.map((navItem: NavItem, idx: number) => (
		<motion.li key={startIdx + idx} variants={itemVariant}>
			<MenuItem
				navItem={navItem}
				activeLinkIndex={props.activeLinkIndex}
				idx={startIdx + idx}
				setActiveLinkIndex={props.setActiveLinkIndex}
				setIsOpen={props.setIsOpen}
			/>
		</motion.li>
	));
};

export default function Menu({ ...props }: MenuProps) {
	return (
		<motion.div
			variants={containerVariant}
			initial="hidden"
			animate="show"
			exit="hidden"
			aria-hidden={!props.isOpen}
		>
			<nav
				className="max-h-[80vh] overflow-y-auto pt-6 pb-3 sm:pb-2 px-2 sm:px-4 space-y-4 border-t border-border/20"
				aria-label="Main navigation"
				aria-expanded={props.isOpen}
			>
				<div>
					<motion.h5 variants={itemVariant} className="font-medium text-sm tracking px-2 mb-2">
						Navigation
					</motion.h5>
					<ul>{renderMenuItems(props.navItems.navigationLinks, props)}</ul>
				</div>
				<div>
					<motion.h5 variants={itemVariant} className="font-medium text-sm tracking px-2 mb-2">
						Links
					</motion.h5>
					<ul>
						{renderMenuItems(
							props.navItems.otherLinks,
							props,
							props.navItems.navigationLinks.length
						)}
						{renderMenuItems(
							props.navItems.socialLinks,
							props,
							props.navItems.navigationLinks.length + props.navItems.otherLinks.length
						)}
					</ul>
				</div>
			</nav>

			{/*  MenuFooter */}
			<motion.div
				variants={itemVariant}
				className="hidden sm:flex py-3 px-4 sm:px-6 gap-8 items-center text-sm font-sans font-normal text-foreground/70 border-t border-border/20 select-none"
			>
				<Kbd label="Menu" icons={[<IconCommand width={14} />]} iconTitle="Command" letter="K" />
				<Kbd label="Theme" icons={[<IconCommand width={14} />]} iconTitle="Command" letter="B" />
				<Kbd label="Navigate" icons={[<IconArrowUp width={12} />, <IconArrowDown width={12} />]} />
				<Kbd label="Open" icons={[<IconEnter width={15} />]} />
			</motion.div>
		</motion.div>
	);
}
