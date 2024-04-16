import { NavItem } from '@/lib/data';
import { IconEnter } from '@/lib/icons';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface MenuItemProps {
	navItem: NavItem;
	idx: number;
	activeLinkIndex: number | null;
	setActiveLinkIndex: React.Dispatch<React.SetStateAction<number | null>>;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MenuItem({
	navItem,
	idx,
	activeLinkIndex,
	setActiveLinkIndex,
	setIsOpen,
}: MenuItemProps) {
	const isExternalLink = navItem.path.startsWith('https://');

	return (
		<Link
			href={navItem.path}
			target={isExternalLink ? '_blank' : ''}
			rel={isExternalLink ? 'noopener noreferrer' : ''}
			className={cn(
				'text-sm flex items-center gap-x-3 px-2 py-3 rounded-lg h-12',
				idx === activeLinkIndex && 'bg-background/20 text-primary'
			)}
			onMouseEnter={() => setActiveLinkIndex(idx)}
			onMouseLeave={() => setActiveLinkIndex(null)}
			onClick={() => setIsOpen(false)}
		>
			{navItem.icon ? navItem.icon : <span className="text-lg pb-1.5">‣</span>}
			<span>{navItem.name}</span>

			{idx === activeLinkIndex && (
				<div className="hidden sm:block ml-auto px-0.5 shadow-sm bg-background/20 text-primary rounded">
					<IconEnter width={16} />
				</div>
			)}
		</Link>
	);
}
