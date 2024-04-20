'use client';

import { IconMoon, IconSun } from '@/lib/icons';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import Button from './button';
import Tooltip from './tooltip';

export default function ThemeSwitcher() {
	const [mounted, setMounted] = useState(false);
	const { setTheme, theme } = useTheme();

	// Make sure theme is loaded
	useEffect(() => setMounted(true), []);

	useEffect(() => {
		const handleKeys = (e: KeyboardEvent) => {
			if (e.key === 'b' && e.metaKey) {
				setTheme(theme === 'dark' ? 'light' : 'dark');
			}
		};
		window.addEventListener('keydown', handleKeys);

		return () => window.removeEventListener('keydown', handleKeys);
	}, [theme, setTheme]);

	return (
		<Tooltip label={`Change to ${theme == 'dark' ? 'light' : 'dark'} mode`}>
			<Button
				size="icon"
				onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
				className="active:scale-95 relative overflow-hidden"
				aria-label="Toggle theme"
			>
				<AnimatePresence mode="wait">
					{mounted &&
						(theme == 'light' ? (
							<motion.div
								key="light"
								className="absolute"
								initial={{ x: 30, opacity: 0 }}
								exit={{ x: 30, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{ type: 'tween', duration: 0.1, ease: 'easeInOut' }}
							>
								<IconSun />
							</motion.div>
						) : (
							<motion.div
								key="dark"
								className="absolute"
								initial={{ x: -30, opacity: 0 }}
								exit={{ x: -30, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{ type: 'tween', duration: 0.1, ease: 'easeInOut' }}
							>
								<IconMoon />
							</motion.div>
						))}
				</AnimatePresence>
			</Button>
		</Tooltip>
	);
}
