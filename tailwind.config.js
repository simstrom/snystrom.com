const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./pages/**/*.{js, jsx}', './components/**/*.{js,jsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				'gray-opaque-100': 'rgba(255, 255, 255, 0.08)',
				'gray-opaque-200': 'rgba(255, 255, 255, 0.2)',
				'black-opaque-100': 'rgba(0, 0, 0, 0.08)',
				'black-opaque-200': 'rgba(0, 0, 0, 0.2)',
				gray: {
					800: '#27272A',
					900: '#18181B',
				},
			},
		},
		fontFamily: {
			// sans: ['var(--font-satoshi)', ...fontFamily.sans],
			sans: ['Inter', ...fontFamily.sans],
		},
		typography: (theme) => ({
			DEFAULT: {
				css: {
					color: theme('colors.gray.600'),
					'h1,h2,h3,h4': {
						color: theme('colors.gray.900'),
					},
				},
			},
			dark: {
				css: {
					color: theme('colors.gray.400'),
					'h1,h2,h3,h4': {
						color: theme('colors.gray.50'),
					},
				},
			},
		}),
	},
	future: {
		hoverOnlyWhenSupported: true,
	},
	plugins: [require('@tailwindcss/typography')],
};
