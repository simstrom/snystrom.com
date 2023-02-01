import cn from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavItem({ href, label }) {
	const router = useRouter();
	const isActive = router.asPath === href;

	return (
		<>
			<Link
				href={href}
				className={cn(
					'px-4 py-2 rounded-full hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300',
					isActive
						? 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
						: 'text-gray-600 dark:text-gray-400'
				)}
			>
				{label}
			</Link>
		</>
	);
}
