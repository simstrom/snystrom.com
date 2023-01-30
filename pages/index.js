import Contact from '../components/Contact';
import Container from '../components/Container';

export default function Home() {
	return (
		<Container>
			<div className="flex flex-col justify-center items-start max-w-3xl w-full mx-auto pb-16">
				<h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1">Hello World</h1>
				<Contact />
			</div>
		</Container>
	);
}
