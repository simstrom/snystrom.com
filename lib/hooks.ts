import { useEffect, useState } from 'react';

export function useIsMounted() {
	const [isMounted, setIsMounted] = useState(false);
	useEffect(() => {
		setIsMounted(true);
	}, []);
	return isMounted;
}

export function useMousePosition(ref: React.RefObject<HTMLDivElement>) {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const updateMousePosition = (e: MouseEvent) => {
			if (!ref.current) return;

			const { left, top } = ref.current.getBoundingClientRect();
			setMousePosition({ x: e.clientX - left, y: e.clientY - top });
		};

		window.addEventListener('mousemove', updateMousePosition);
		return () => {
			window.removeEventListener('mousemove', updateMousePosition);
		};
	}, [ref]);

	return mousePosition;
}
