const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./pages/**/*.{js, jsx}', './components/**/*.{js,jsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				brand: 'hsl(var(--brand) / 100)',
			},
			textColor: {
				primary: 'hsl(var(--typeface-primary) / 100)',
				secondary: 'hsl(var(--typeface-secondary) / 100)',
				tertiary: 'hsl(var(--typeface-tertiary) / 100)',
			},
			backgroundColor: {
				primary: 'hsl(var(--bg) / 100)',
				secondary: 'hsl(var(--bg-card) / 100)',
				tertiary: 'hsl(var(--foreground) / 60)',
			},
			borderColor: {
				primary: 'hsl(var(--border) / 100)',
			},
		},
		fontSize: {
			xs: [
				'0.75rem',
				{
					letterSpacing: '0.3px',
					fontWeight: '400',
				},
			],
			sm: [
				'0.875rem',
				{
					lineHeight: '1.75',
					letterSpacing: '0.3px',
					fontWeight: '400',
				},
			],
			base: [
				'1rem',
				{
					lineHeight: '1.75',
					letterSpacing: '0.3px',
					fontWeight: '400',
				},
			],
			lg: [
				'1.125rem',
				{
					lineHeight: '1.75',
					letterSpacing: '0px',
					fontWeight: '600',
				},
			],
			xl: [
				'1.25rem',
				{
					letterSpacing: '0px',
					fontWeight: '600',
				},
			],
			'2xl': [
				'1.5rem',
				{
					letterSpacing: '0px',
					fontWeight: '600',
				},
			],
			'3xl': [
				'1.75rem',
				{
					letterSpacing: '0px',
					fontWeight: '600',
				},
			],
			'4xl': [
				'2.25rem',
				{
					letterSpacing: '0px',
					fontWeight: '600',
				},
			],
		},
		fontFamily: {
			sans: ['Inter', ...fontFamily.sans],
		},
	},
	future: {
		hoverOnlyWhenSupported: true,
	},
	plugins: [require('@tailwindcss/typography')],
};
