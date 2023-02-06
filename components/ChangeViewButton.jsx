import cn from 'clsx';

export default function ChangeViewButton({ children, currentlyActive, handleViewChange }) {
	return (
		<div className="group relative flex justify-center">
			<button
				className={cn(
					'p-2 rounded-lg flex text-sm gap-2',
					currentlyActive
						? 'bg-brand/10 text-brand'
						: 'text-tertiary hover:text-primary duration-300'
				)}
				onClick={handleViewChange}
			>
				{children}
			</button>
			{!currentlyActive && (
				<span className="mb-1 absolute min-w-[75px] bottom-10 scale-0 rounded-lg bg-tertiary p-2 text-xs text-tertiary group-hover:scale-100 duration-300">
					Grid View
				</span>
			)}
		</div>
	);
}
