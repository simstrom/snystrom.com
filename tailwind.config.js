const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./pages/**/*.{js, jsx}', './components/**/*.{js,jsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				brand: 'hsl(var(--brand) / 100)',
				brandLight: 'hsl(var(--brand-light) / 100)',
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
			keyframes: {
				in: {
					'0%': { transform: 'translateY(30px)', opacity: 0 },
					'100%': { transform: 'translateY(0)', opacity: 1 },
				},
			},
			animation: {
				in: 'in .6s both',
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						color: theme('textColor.secondary'),
						'h2, h3, h4': {
							color: theme('textColor.primary'),
						},
						a: {
							color: theme('colors.brand'),
							textDecoration: 'none',
							borderBottom: '1px solid transparent',
							transition: 'all 0.3s',
							'&:hover': {
								color: theme('colors.brandLight'),
								borderColor: theme('colors.brandLight'),
								transition: 'all 0.3s',
							},
						},
						hr: { borderColor: theme('borderColor.primary') },
						li: {
							'&::marker': { color: theme('colors.brand') },
						},
						strong: { color: theme('textColor.primary') },
						em: { color: theme('textColor.tertiary') },
						code: {
							color: theme('colors.brandLight'),
							fontWeight: '500',
							backgroundColor: theme('backgroundColor.tertiary'),
							padding: '.3rem',
							borderRadius: '.5rem',
							border: '1px solid',
							borderColor: theme('borderColor.primary'),
							boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
						},
						'code::before': false,
						'code::after': false,
						blockquote: {
							borderLeftColor: theme('colors.brand'),
							color: theme('textColor.secondary'),
						},
						'blockquote p:first-of-type::before': false,
						'blockquote p:last-of-type::after': false,
					},
				},
			}),
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
