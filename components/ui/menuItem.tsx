import { NavItem } from '@/lib/data';
import { IconEnter } from '@/lib/icons';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { memo } from 'react';

interface MenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
	navItem: NavItem;
	idx: number;
	setFocusedIndex: React.Dispatch<React.SetStateAction<number | null>>;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	isCurrentPath: boolean;
	isFocused: boolean;
}

const MenuItem: React.FC<MenuItemProps> = memo(
	({ navItem, idx, setFocusedIndex, setIsOpen, isCurrentPath, isFocused }: MenuItemProps) => {
		const isExternalLink = navItem.path.startsWith('https://');

		return (
			<Link
				href={navItem.path}
				target={isExternalLink ? '_blank' : ''}
				rel={isExternalLink ? 'noopener noreferrer' : ''}
				className={cn(
					'text-sm tracking-wide flex items-center gap-x-3 px-2 py-3 rounded-lg h-12',
					isFocused && 'bg-background/20 text-primary'
				)}
				onMouseEnter={() => setFocusedIndex(idx)}
				onMouseLeave={() => setFocusedIndex(null)}
				onClick={() => setIsOpen(false)}
			>
				{navItem.icon ? (
					navItem.icon
				) : (
					<span className={cn('text-lg pb-1', isCurrentPath && 'text-primary')}>‣</span>
				)}
				{navItem.name}

				{isFocused && (
					<div className="hidden sm:block ml-auto px-0.5 shadow-sm bg-background/20 text-primary rounded">
						<IconEnter width={16} />
					</div>
				)}
			</Link>
		);
	}
);

MenuItem.displayName = 'MenuItem';
export default MenuItem;
