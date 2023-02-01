export default function Footer() {
	return (
		<footer className="flex flex-col justify-center items-center w-full mx-auto mb-8 font-body text-center">
			<hr className="w-full border-1 border-black-opaque-100 dark:border-gray-opaque-100 mb-8 sm:hidden" />
			<p className="text-gray-600 dark:text-gray-400">Designed and developed by Simon Nyström.</p>
			<p className="text-gray-400 dark:text-gray-600">
				Built with Next.js & Tailwind. Powered by Vercel.
			</p>
		</footer>
	);
}
