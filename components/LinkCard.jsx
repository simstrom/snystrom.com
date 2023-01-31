import { TopRightIcon } from './Icons';

export default function LinkCard({ href, icon, children }) {
	return (
		<a
			className="flex justify-between border border-black-opaque-100 dark:border-gray-opaque-100 p-4 rounded-lg group hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
			target="_blank"
			rel="noopener noreferrer"
			href={href}
		>
			<div className="flex gap-4">
				<div>{icon}</div>
				{children}
			</div>
			<div className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
				<TopRightIcon />
			</div>
		</a>
	);
}
