import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

interface CursorProps {
	size?: number;
	containerClass?: string;
	cursorClass?: string;
	children?: React.ReactNode;
}

export default function Cursor({ size = 80, containerClass, cursorClass, children }: CursorProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	const animationStates = {
		hidden: {
			opacity: 0,
		},
		show: {
			opacity: 1,
			height: size,
			width: size,
			translateX: -size / 2,
			translateY: -size / 2,
		},
	};

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!containerRef.current) return;
		const { left, top } = containerRef.current.getBoundingClientRect();

		const newX = e.clientX - left;
		const newY = e.clientY - top;
		setMousePosition({ x: newX, y: newY });
	};

	return (
		<div
			ref={containerRef}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsVisible(true)}
			onMouseLeave={() => setIsVisible(false)}
			className={cn(
				'hidden sm:block w-full h-full overflow-hidden cursor-none absolute z-50 inset-0',
				containerClass
			)}
		>
			{isVisible && (
				<>
					<motion.div
						variants={animationStates}
						initial={'hidden'}
						animate={'show'}
						exit={'hidden'}
						transition={{ type: 'tween', ease: 'easeInOut', duration: 0.2 }}
						whileTap={{ scale: 0.8 }}
						style={{
							left: mousePosition.x,
							top: mousePosition.y,
						}}
						className={cn(
							'absolute flex items-center justify-center rounded-full bg-brand-secondary dark:bg-brand text-foreground-inverse',
							cursorClass
						)}
					>
						{children}
					</motion.div>
				</>
			)}
		</div>
	);
}
