import cn from 'clsx';
import Link from 'next/link';
import { RightArrowIcon } from './Icons';

export default function LinkArrow({ text, href, sm }) {
	return (
		<Link
			href={href}
			className={cn(
				'text-tertiary ml-auto flex items-center gap-1 group hover:text-brand transition-colors duration-300',
				sm ? 'min-[640px]:hidden' : 'sm:gap-3 max-[640px]:hidden'
			)}
		>
			<div className="text-sm font-medium">{text}</div>
			<div className="group-hover:translate-x-2 transition-transform duration-300">
				<RightArrowIcon />
			</div>
		</Link>
	);
}
