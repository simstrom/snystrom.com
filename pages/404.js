import Button from '@/components/Button';
import Container from '@/components/Container';

export default function Custom404() {
	return (
		<Container>
			<div className="flex flex-col gap-2 mt-20 sm:items-center">
				<div className="text-sm font-semibold tracking-widest uppercase text-secondary animate-in">
					404 - Page Not Found
				</div>
				<h1 className="text-4xl animate-in animation-delay-1">Oh no!</h1>
				<h2 className="text-lg sm:text-xl text-secondary animate-in animation-delay-2">
					It looks like you have strayed too far.
				</h2>
				<p className="text-sm sm:text-base animate-in animation-delay-3">
					Don&apos;t you worry, I&apos;m here to take you back.
				</p>

				<Button href="/">Take me Home</Button>
			</div>
		</Container>
	);
}
