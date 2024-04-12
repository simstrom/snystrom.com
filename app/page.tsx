import { IconGithub } from '@/lib/icons';

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<div className="flex gap-2">
				<IconGithub />
				Find me on Github
			</div>
		</main>
	);
}
