import { NavItem } from '@/lib/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface MenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
	navItem: NavItem;
	idx: number;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	isCurrentPath: boolean;
	className?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
	navItem,
	idx,
	setIsOpen,
	isCurrentPath,
}: MenuItemProps) => {
	const isExternalLink = navItem.path.startsWith('https://');

	return (
		<Link
			href={navItem.path}
			target={isExternalLink ? '_blank' : ''}
			rel={isExternalLink ? 'noopener noreferrer' : ''}
			className={cn(
				'w-fit text-xl tracking-normal px-2 py-1 font-medium dark:font-[450] text-foreground/80 dark:text-foreground/90',
				isCurrentPath &&
					'text-foreground dark:font-medium underline underline-offset-4 decoration-2 decoration-foreground/30'
			)}
			onClick={() => setIsOpen(false)}
		>
			{navItem.name}
		</Link>
	);
};

MenuItem.displayName = 'MenuItem';
export default MenuItem;
