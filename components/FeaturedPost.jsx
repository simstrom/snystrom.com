import cn from 'clsx';

export default function FeaturedPost({ gradientFrom, gradientTo, post }) {
	return (
		<div
			className={cn(
				'w-full rounded-xl p-1 hover:-translate-y-2 transition-transform',
				'bg-gradient-to-r',
				gradientFrom,
				gradientTo
			)}
		>
			<div className="flex flex-col gap-2 sm:gap-16 px-6 py-6 sm:py-8 w-full h-full rounded-lg bg-gray-100 dark:bg-gray-900">
				<div className="flex flex-col gap-1">
					<h5 className="text-xs tracking-widest font-medium text-gray-600 dark:text-gray-400">
						{/* Post Category */}
						DEV
					</h5>
					<h3 className="text-lg font-semibold tracking-tight">
						{/* Post title */}
						Past present & future of React State Management
					</h3>
				</div>
				<div className="mt-auto flex gap-2 sm:flex-col sm:gap-0 text-sm">
					{/* Post details */}
					<div className="order-2 sm:order-1 text-gray-600 dark:text-gray-400">July 18, 2022</div>
					<div className="order-1 sm:order-2 font-medium">2 min read</div>
				</div>
			</div>
		</div>
	);
}
