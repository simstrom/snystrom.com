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
					'w-full text-sm font-medium px-4 py-2 rounded-full hover:text-brand transition-colors duration-300',
					isActive ? 'bg-brand/5 text-brand' : 'text-secondary'
				)}
			>
				{label}
			</Link>
		</>
	);
}
