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
			{mounted && (
				<motion.button
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.2 }}
					onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
					className={cn(
						'p-2 rounded-full overflow-hidden text-foreground/80 hover:text-foreground hover:bg-background-secondary dark:hover:bg-foreground/10 transition-colors',
						className
					)}
					aria-label="Toggle theme"
				>
					<div className="relative h-5 w-5 flex items-center justify-center">
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
			)}
		</AnimatePresence>
	);
}
