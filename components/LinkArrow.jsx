import cn from 'clsx';
import Link from 'next/link';
import { RightArrowIcon } from './Icons';

export default function LinkArrow({ text, href, sm }) {
	return (
		<Link
			href={href}
			className={cn(
				'text-gray-900 dark:text-gray-100 ml-auto flex items-center gap-1 group',
				sm ? 'min-[470px]:hidden' : 'sm:gap-3 max-[470px]:hidden'
			)}
		>
			<div className="text-sm font-medium">{text}</div>
			<div className="group-hover:translate-x-2 transition-transform duration-300">
				<RightArrowIcon />
			</div>
		</Link>
	);
}
