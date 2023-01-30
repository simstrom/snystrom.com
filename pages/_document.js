import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en" className="">
			<Head>
				<link href="/static/favicon.ico" rel="shortcut icon" />
				<meta content="#F9FAFB" name="theme-color" />
			</Head>
			<body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 transition-colors duration-300">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
