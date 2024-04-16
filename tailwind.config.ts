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
				serif: ['var(--font-serif)', ...fontFamily.serif],
				mono: ['var(--font-mono)', ...fontFamily.mono],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			letterSpacing: {
				widest: '.15em',
			},
			boxShadow: {
				shadow: '2px 4px 30px rgba(0, 0, 0, 0.1)',
				glow: '0px 0px 80.4px rgba(235, 225, 217, 0.3), 0px 0px 55.2px rgba(235, 225, 217, 0.7), 0px 0px 0px #EBE1D9, 0px 0px 22.1px #EBE1D9, 0px 0px 3.3px #EBE1D9, 0px 0px 7.8px #EBE1D9',
			},
			backgroundImage: {
				rainbow: "url('/rainbow.svg')",
			},
			animation: {
				scroll: 'scroll 30s forwards linear infinite',
				spinner: 'wiggle 3s forwards linear infinite',
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
			},
		},
	},
	plugins: [],
	// require('@tailwindcss/typography') - https://github.com/tailwindlabs/tailwindcss-typography
} satisfies Config;

export default config;
