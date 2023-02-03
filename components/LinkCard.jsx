import { TopRightIcon } from './Icons';

// Card for EXTERNAL links
export default function LinkCard({ href, icon, children }) {
	return (
		<a
			className="text-sm font-medium text-tertiary flex justify-between border border-primary sm:bg-secondary p-4 rounded-lg group drop-shadow-sm hover:text-brand hover:bg-brand/5 transition duration-300"
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
