const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette');

import type { Config } from 'tailwindcss';
const { fontFamily } = require('tailwindcss/defaultTheme');

const config = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
			},
		},
		extend: {
			fontFamily: {
				sans: ['var(--font-sans)', ...fontFamily.sans],
				mono: ['var(--font-mono)', ...fontFamily.mono],
			},
			colors: {
				border: 'hsl(var(--border))',
				background: {
					DEFAULT: 'hsl(var(--background))',
					secondary: 'hsl(var(--background-secondary))',
					tertiary: 'hsl(var(--background-tertiary))',
				},
				foreground: {
					DEFAULT: 'hsl(var(--foreground))',
					secondary: 'hsl(var(--foreground-secondary))',
					inverse: 'hsl(var(--foreground-inverse))',
				},
				brand: {
					DEFAULT: 'hsl(var(--brand))',
					secondary: 'hsl(var(--brand-secondary))',
				},
			},
			boxShadow: {
				shadow:
					'0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.15), 1px 1.5px 2px -0.8px hsl(var(--shadow-color) / 0.15), 2.5px 3.7px 5px -1.7px hsl(var(--shadow-color) / 0.15), 6.1px 9.1px 12.3px -2.5px hsl(var(--shadow-color) / 0.15)',
			},
			animation: {
				scroll: 'scroll 40s forwards linear infinite',
				wiggle: 'wiggle 3s forwards linear infinite',
				aurora: 'aurora 50s forwards linear infinite',
			},
			keyframes: {
				scroll: {
					to: {
						transform: 'translate(calc(-50% - 0.5rem))',
					},
				},
				wiggle: {
					'0%': { transform: 'rotate(-24deg)' },
					'50%': { transform: 'rotate(24deg)' },
					'100%': { transform: 'rotate(-24deg)' },
				},
				aurora: {
					from: {
						backgroundPosition: '50% 50%, 50% 50%',
					},
					to: {
						backgroundPosition: '350% 50%, 350% 50%',
					},
				},
			},
		},
	},
	plugins: [require('@tailwindcss/typography'), addVariablesForColors],
} satisfies Config;

function addVariablesForColors({ addBase, theme }: any) {
	let allColors = flattenColorPalette(theme('colors'));
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);

	addBase({
		':root': newVars,
	});
}

export default config;
