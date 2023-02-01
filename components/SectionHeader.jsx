import Link from 'next/link';
import { RightArrowIcon } from './Icons';

export default function SectionHeader({ num, btnText, href, children }) {
	return (
		<div className="w-full flex max-[470px]:flex-col items-baseline mb-6 border-b border-black-opaque-100 dark:border-gray-opaque-100 max-[470px]:border-0">
			<div className="flex items-baseline gap-2 pb-2 max-[470px]:w-full max-[470px]:border-b border-black-opaque-100 dark:border-gray-opaque-100">
				<div className="font-bold uppercase tracking-widest text-emerald-500">{num}.</div>
				<h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{children}</h2>
			</div>

			{href && (
				<Link
					href={href}
					className="text-gray-900 dark:text-gray-100 min-[470px]:ml-auto flex items-center gap-1 sm:gap-3 group max-[470px]:pt-4"
				>
					<div className="text-sm font-medium">{btnText}</div>
					<div className="group-hover:translate-x-2 transition-transform duration-300">
						<RightArrowIcon />
					</div>
				</Link>
			)}
		</div>
	);
}
