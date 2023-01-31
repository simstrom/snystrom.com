import { TopRightIcon } from './Icons';

// Card for EXTERNAL links
export default function LinkCard({ href, icon, children }) {
	return (
		<a
			className="flex justify-between border border-black-opaque-100 dark:border-gray-opaque-100 p-4 rounded-lg group hover:bg-gray-200/30 dark:hover:bg-gray-800/30"
			target="_blank"
			rel="noopener noreferrer"
			href={href}
		>
			<div className="flex items-center gap-4">
				<div>{icon}</div>
				{children}
			</div>
			<div className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
				<TopRightIcon />
			</div>
		</a>
	);
}
