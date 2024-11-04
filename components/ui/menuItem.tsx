import { NavItem } from '@/lib/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { memo } from 'react';

interface MenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
	navItem: NavItem;
	idx: number;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	isCurrentPath: boolean;
}

const MenuItem: React.FC<MenuItemProps> = memo(
	({ navItem, idx, setIsOpen, isCurrentPath }: MenuItemProps) => {
		const isExternalLink = navItem.path.startsWith('https://');

		return (
			<Link
				href={navItem.path}
				target={isExternalLink ? '_blank' : ''}
				rel={isExternalLink ? 'noopener noreferrer' : ''}
				className={cn(
					'font-mono tracking-tighter text-sm flex items-center gap-x-3 px-2 py-3 rounded-lg h-12'
				)}
				onClick={() => setIsOpen(false)}
			>
				{navItem.icon ? (
					navItem.icon
				) : (
					<span className={cn('text-lg', isCurrentPath && 'text-brand')}>‣</span>
				)}
				{navItem.name}
			</Link>
		);
	}
);

MenuItem.displayName = 'MenuItem';
export default MenuItem;
