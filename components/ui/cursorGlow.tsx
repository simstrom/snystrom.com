'use client';

import { useMousePosition } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef } from 'react';

type CursorProps = {
	children: React.ReactNode;
	cursorElement?: React.ReactNode;
	size?: number;
	strength?: number;
	containerClass?: string;
	cursorClass?: string;
};

export default function CursorGlow({
	children,
	cursorElement,
	size = 80,
	strength = 100,
	containerClass,
	cursorClass,
}: CursorProps) {
	const ref = useRef(null);
	const { x, y } = useMousePosition(ref);
	const offset = -size / 2;

	const animationStates = {
		hidden: {
			opacity: 0,
		},
		show: {
			display: 'flex',
			opacity: strength / 100,
			scale: 2,
		},
		active: {
			scale: 1.9,
		},
	};

	return (
		<motion.div
			ref={ref}
			key="container"
			initial="hidden"
			whileHover="show"
			whileTap="active"
			className={cn('relative w-full h-full overflow-hidden', containerClass)}
		>
			<AnimatePresence>
				<motion.div
					key="cursor"
					variants={animationStates}
					style={{
						left: x,
						top: y,
						width: size / 2,
						height: size / 2,
						translateX: offset / 2,
						translateY: offset / 2,
					}}
					transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 1.1 }}
					className={cn(
						'absolute inset-0 z-50 pointer-events-none flex items-center justify-center',
						cursorClass
					)}
				>
					<div className="scale-50">{cursorElement}</div>
				</motion.div>
			</AnimatePresence>

			{children}
		</motion.div>
	);
}
