import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en" className="">
			<Head>
				<link href="/static/favicon.ico" rel="shortcut icon" />
				<meta content="#18181B" name="theme-color" />
			</Head>
			<body className="w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
