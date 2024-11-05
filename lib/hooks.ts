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

export function useScreenBreakpoints() {
	const [isSmall, setIsSmall] = useState<boolean>(false);
	const [isMedium, setIsMedium] = useState<boolean>(false);
	const [isLarge, setIsLarge] = useState<boolean>(false);

	useEffect(() => {
		const updateScreenBreakpoints = () => {
			const screenWidth = window.innerWidth;
			setIsSmall(screenWidth < 640);
			setIsMedium(screenWidth >= 640 && screenWidth < 768);
			setIsLarge(screenWidth >= 768);
		};

		updateScreenBreakpoints();
		window.addEventListener('resize', updateScreenBreakpoints);

		return () => {
			window.removeEventListener('resize', updateScreenBreakpoints);
		};
	}, []);

	return { isSmall, isMedium, isLarge };
}

export const useScrollLock = (lock: boolean) => {
	const { isMedium, isLarge } = useScreenBreakpoints();

	useEffect(() => {
		if (lock) {
			document.body.style.overflow = 'hidden';
		}

		// Release lock if window width is resized past breakpoints
		if (isMedium || isLarge) {
			document.body.style.overflow = 'unset';
		}
		return () => {
			if (lock) {
				document.body.style.overflow = 'unset';
			}
		};
	}, [lock, isMedium, isLarge]);
};
