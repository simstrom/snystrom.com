import Image from 'next/image';
import Container from '../components/Container';

export default function about() {
	return (
		<Container>
			<div className="flex flex-col justify-center items-start max-w-3xl w-full mx-auto mb-28">
				<h1 className="font-bold text-4xl tracking-tight">About Me</h1>
				<div className="w-full grid gap-4 grid-cols-3">
					<div className="relative h-60">
						<Image
							src="/loop-agile.png"
							alt=""
							fill
							className="object-cover overflow-hidden rounded-lg"
						/>
					</div>
					<div className="relative h-60">
						<Image
							src="/loop-agile.png"
							alt=""
							fill
							className="object-cover overflow-hidden rounded-lg"
						/>
					</div>
					<div className="relative h-60">
						<Image
							src="/loop-agile.png"
							alt=""
							fill
							className="object-cover overflow-hidden rounded-lg"
						/>
					</div>
				</div>
			</div>
		</Container>
	);
}
