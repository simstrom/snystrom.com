import { IconTheme } from '@/lib/icons';
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
				className="active:scale-90"
				aria-label="Toggle theme"
			>
				<IconTheme />
			</Button>
		</Tooltip>
	);
}
