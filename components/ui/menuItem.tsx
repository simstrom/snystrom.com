import { NavItem } from '@/lib/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface MenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
	navItem: NavItem;
	idx: number;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	isCurrentPath: boolean;
	as?: any;
	className?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
	navItem,
	idx,
	setIsOpen,
	isCurrentPath,
	as: Component = Link,
}: MenuItemProps) => {
	const isExternalLink = navItem.path.startsWith('https://');

	return (
		<Component
			href={navItem.path}
			target={isExternalLink ? '_blank' : ''}
			rel={isExternalLink ? 'noopener noreferrer' : ''}
			className={cn(
				'w-fit text-xl tracking-normal px-2 py-1 font-medium dark:font-[450] text-foreground-secondary',
				isCurrentPath &&
					'text-black dark:text-white dark:font-medium underline underline-offset-4 decoration-2 decoration-foreground/30'
			)}
			onClick={() => Component === Link && setIsOpen(false)}
		>
			{navItem.name}
		</Component>
	);
};

MenuItem.displayName = 'MenuItem';
export default MenuItem;
