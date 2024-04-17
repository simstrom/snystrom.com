import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

interface CursorProps {
	children?: React.ReactNode;
	containerClass?: string;
	cursorClass?: string;
}

export default function Cursor({ children, containerClass, cursorClass }: CursorProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	const variants = {
		hidden: {
			opacity: 0,
		},
		show: {
			opacity: 1,
			height: 60,
			width: 60,
			translateX: -30,
			translateY: -30,
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
						variants={variants}
						initial={'hidden'}
						animate={'show'}
						exit={'hidden'}
						transition={{ type: 'spring', stiffness: 500, damping: 25, mass: 1.5 }}
						whileTap={{ scale: 0.8 }}
						style={{
							left: mousePosition.x,
							top: mousePosition.y,
						}}
						className={cn(
							'absolute flex items-center justify-center rounded-full bg-foreground text-background',
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
