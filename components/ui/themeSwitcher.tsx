import { IconMoon, IconSun } from '@/data/icons';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

export default function ThemeSwitcher({ className }: { className?: string }) {
	const { setTheme } = useTheme();

	return (
		<>
			<button
				onClick={() => setTheme('light')}
				className={cn('hidden dark:block', className)}
				aria-label="Change to light mode"
			>
				<IconSun />
			</button>
			<button
				onClick={() => setTheme('dark')}
				className={cn('dark:hidden', className)}
				aria-label="Change to dark mode"
			>
				<IconMoon />
			</button>
		</>
	);
}
