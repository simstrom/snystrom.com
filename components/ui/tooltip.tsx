import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface TooltipProps {
	children?: React.ReactNode;
	label: string;
	className?: string;
}

export default function Tooltip({ children, label, className }: TooltipProps) {
	const [isVisible, setIsVisible] = useState(false);

	return (
		<div
			className="relative"
			onMouseEnter={() => setIsVisible(true)}
			onMouseLeave={() => setIsVisible(false)}
			onMouseDown={() => setIsVisible(false)}
		>
			<AnimatePresence>
				{isVisible && (
					<motion.div
						className="flex items-center justify-center w-max absolute top-full right-0 sm:left-0 transform -translate-x-1/2 z-[999] px-2 py-1 mt-2 text-sm tracking-wide bg-background-secondary border rounded-lg shadow-shadow text-center pointer-events-none"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.2, delay: 0.5 }}
					>
						{label}
					</motion.div>
				)}
			</AnimatePresence>
			{children}
		</div>
	);
}
