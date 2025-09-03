const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette');

import type { Config } from 'tailwindcss';
const { fontFamily, screens } = require('tailwindcss/defaultTheme');

const config = {
	darkMode: 'class',
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./lib/**/*.{ts,tsx}',
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
		screens: {
			xs: '475px',
			...screens,
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
				},
				foreground: {
					DEFAULT: 'hsl(var(--foreground))',
					secondary: 'hsl(var(--foreground-secondary))',
					tertiary: 'hsl(var(--foreground-tertiary))',
				},
				brand: {
					DEFAULT: 'hsl(var(--brand))',
				},
			},
			animation: {
				loop: 'loop 100s linear infinite',
				scroll: 'scroll 40s forwards linear infinite',
				scrollSlow: 'scroll 100s forwards linear infinite',
				aurora: 'aurora 50s forwards linear infinite',
				slide: 'slide 0.3s ease-out forwards',
				slideSlow: 'slide 0.6s ease-out forwards',
				// Animated Badge
				flip: 'flip 6s infinite steps(2, end)',
				rotate: 'rotate 3s linear infinite both',
			},
			keyframes: {
				loop: {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-50%)' },
				},
				scroll: {
					to: {
						transform: 'translate(calc(-50% - 0.5rem))',
					},
				},
				slide: {
					'0%': { opacity: '0', transform: 'translateY(75px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				aurora: {
					from: {
						backgroundPosition: '50% 50%, 50% 50%',
					},
					to: {
						backgroundPosition: '350% 50%, 350% 50%',
					},
				},
				// Animated Badge
				flip: {
					to: {
						transform: 'rotate(360deg)',
					},
				},
				rotate: {
					to: {
						transform: 'rotate(90deg)',
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
