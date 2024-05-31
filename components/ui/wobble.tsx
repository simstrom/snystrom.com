'use client';

import { cn } from '@/lib/utils';
import { MotionStyle, motion } from 'framer-motion';

import { useState } from 'react';

type Props = {
	children: React.ReactNode;
	className?: string;
	containerClassName?: string;
	containerStyle?: MotionStyle | React.CSSProperties;
	style?: MotionStyle | React.CSSProperties;
};

export default function Wobble({
	children,
	className,
	containerClassName,
	style,
	containerStyle,
}: Props) {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [isHovering, setIsHovering] = useState(false);

	const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
		const { clientX, clientY } = event;
		const rect = event.currentTarget.getBoundingClientRect();
		const x = (clientX - (rect.left + rect.width / 2)) / 20;
		const y = (clientY - (rect.top + rect.height / 2)) / 20;
		setMousePosition({ x, y });
	};

	return (
		<motion.div
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => {
				setIsHovering(false);
				setMousePosition({ x: 0, y: 0 });
			}}
			style={{
				...containerStyle,
				transform: isHovering
					? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale3d(1, 1, 1)`
					: 'translate3d(0px, 0px, 0) scale3d(1, 1, 1)',
				transition: 'transform 0.2s ease-out',
			}}
			className={cn('', containerClassName)}
		>
			<motion.div
				style={{
					...style,
					transform: isHovering
						? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale3d(1.03, 1.03, 1)`
						: 'translate3d(0px, 0px, 0) scale3d(1, 1, 1)',
					transition: 'transform 0.2s ease-out',
				}}
				className={cn('', className)}
			>
				{children}
			</motion.div>
		</motion.div>
	);
}
