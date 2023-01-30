import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
