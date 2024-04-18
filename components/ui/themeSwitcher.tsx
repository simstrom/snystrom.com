import { IconMoon, IconSun } from '@/lib/icons';
import { motion } from 'framer-motion';
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
				className="active:scale-90 relative overflow-hidden"
				aria-label="Toggle theme"
			>
				{mounted ? (
					<>
						<motion.div
							className="absolute"
							initial={{ x: theme == 'dark' ? 50 : 0 }}
							animate={{ x: theme == 'dark' ? 50 : 0, y: theme == 'dark' ? 20 : 0 }}
							transition={{ type: 'spring', stiffness: 200, damping: 30 }}
						>
							<IconSun />
						</motion.div>
						<motion.div
							className="absolute"
							initial={{ x: theme == 'light' ? -50 : 0 }}
							animate={{ x: theme == 'light' ? -50 : 0, y: theme == 'light' ? 20 : 0 }}
							transition={{ type: 'spring', stiffness: 200, damping: 30 }}
						>
							<IconMoon />
						</motion.div>
					</>
				) : (
					<div className="h-10 w-10" />
				)}
			</Button>
		</Tooltip>
	);
}
