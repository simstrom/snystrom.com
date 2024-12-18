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
				glow: '0px 0px 17.1124px hsl(var(--brand-secondary)),0px 0px 9.7785px hsl(var(--brand-secondary)), 0px 0px 5.70412px hsl(var(--brand-secondary)),0px 0px 2.85206px hsl(var(--brand-secondary)), 0px 0px 0.814875px hsl(var(--brand-secondary)),0px 0px 0.407438px hsl(var(--brand-secondary))',
				'glow-lg':
					'0px 0px 238.417px hsl(var(--brand-secondary)),0px 0px 136.238px hsl(var(--brand-secondary)), 0px 0px 79.4724px hsl(var(--brand-secondary)),0px 0px 39.7362px hsl(var(--brand-secondary)), 0px 0px 11.3532px hsl(var(--brand-secondary)),0px 0px 5.6766px hsl(var(--brand-secondary))',
			},
			animation: {
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
