'use client';

import { IconMoon, IconSun } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeSwitcher({ className }: { className?: string }) {
	const [mounted, setMounted] = useState(false);
	const { setTheme, theme } = useTheme();

	// Avoid hydration mismatch
	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<AnimatePresence mode="wait">
			{mounted ? (
				<motion.button
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.2 }}
					onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
					className={cn(
						'p-2 rounded-md overflow-hidden text-foreground/80 hover:text-foreground hover:bg-foreground-secondary/10 dark:hover:bg-foreground/10 transition-colors',
						className
					)}
					aria-label={theme === 'dark' ? 'Change to light mode' : 'Change to dark mode'}
				>
					<div className="relative h-[18px] w-[18px] flex items-center justify-center">
						<motion.div
							className="absolute"
							initial={{ y: theme === 'light' ? 0 : 50 }}
							animate={{ y: theme === 'light' ? 0 : 50, rotate: theme === 'light' ? 0 : 100 }}
							transition={{
								type: 'spring',
								stiffness: 300,
								damping: 30,
							}}
						>
							<IconSun />
						</motion.div>

						<motion.div
							className="absolute"
							initial={{ y: theme === 'dark' ? 0 : -50 }}
							animate={{ y: theme === 'dark' ? 0 : -50, rotate: theme === 'dark' ? 0 : -200 }}
							transition={{
								type: 'spring',
								stiffness: 300,
								damping: 30,
							}}
						>
							<IconMoon />
						</motion.div>
					</div>
				</motion.button>
			) : (
				<div className="h-9 w-9"></div>
			)}
		</AnimatePresence>
	);
}
