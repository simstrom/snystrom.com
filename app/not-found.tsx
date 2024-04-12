import { IconClose } from '@/lib/icons';

export default function NotFound() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<div className="flex gap-2">
				<IconClose />
				404
			</div>
		</main>
	);
}
