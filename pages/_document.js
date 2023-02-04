import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link href="/static/favicon.ico" rel="shortcut icon" />
				<meta content="#18181B" name="theme-color" />
			</Head>
			<body className="w-full bg-primary text-primary text-base">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
