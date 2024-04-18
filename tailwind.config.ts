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
				DEFAULT: '.75rem',
				lg: '1rem',
			},
		},
		extend: {
			fontFamily: {
				sans: ['var(--font-sans)', ...fontFamily.sans],
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
				success: 'hsl(var(--success))',
				danger: 'hsl(var(--danger))',
			},
			letterSpacing: {
				widest: '.15em',
			},
			boxShadow: {
				shadow: '2px 4px 30px rgba(0, 0, 0, 0.1)',
				glow: '0px 0px 10.6706px #CDA24C, 0px 0px 6.0975px #CDA24C, 0px 0px 3.55687px #CDA24C, 0px 0px 1.77844px #CDA24C, 0px 0px 0.508125px #CDA24C, 0px 0px 0.254063px #CDA24C',
			},
			backgroundImage: {
				rainbow: "url('/rainbow.svg')",
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
	plugins: [addVariablesForColors],
	// require('@tailwindcss/typography') - https://github.com/tailwindlabs/tailwindcss-typography
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
