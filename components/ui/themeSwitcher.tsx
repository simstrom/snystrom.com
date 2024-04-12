import { IconMoon, IconSun } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeSwitcher() {
	const [mounted, setMounted] = useState(false);
	const { setTheme, theme } = useTheme();

	// Make sure theme is loaded
	useEffect(() => setMounted(true), []);

	return (
		<motion.button
			aria-label="Toggle theme"
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
			className={cn(
				'p-2 text-primary-foreground bg-black/5 border border-border/20 rounded-xl shadow-shadow backdrop-blur transition active:scale-90',
				'hover:text-black/20 hover:border-transparent hover:bg-primary-foreground hover:shadow-glow',
				'relative overflow-hidden'
			)}
		>
			{mounted ? theme == 'dark' ? <IconMoon /> : <IconSun /> : <div className="w-6 h-6" />}
		</motion.button>
	);
}
