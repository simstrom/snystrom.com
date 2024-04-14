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
						className="flex items-center justify-center max-w-96 w-44 right-0 sm:left-0 absolute z-[999] top-full p-2 mt-2 text-sm bg-black/10 text-foreground border border-border/10 rounded-xl shadow-shadow text-center pointer-events-none"
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
