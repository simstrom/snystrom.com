import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavItem({ href, label, target }) {
	const router = useRouter();
	const isActive = router.asPath === href;

	return (
		<Link
			target={target}
			href={href}
			className={`${
				isActive
					? 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-50'
					: 'text-gray-600 dark:text-gray-400'
			} px-4 py-2 rounded-full text-sm hover:text-gray-900 dark:hover:text-gray-50`}
		>
			{label}
		</Link>
	);
}
