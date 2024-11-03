import CustomLink from '@/components/blog/link';
import PageHeader from '@/components/ui/pageHeader';
import { Logo } from '@/lib/icons';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Colophon',
	description: 'A summary of the technologies, design, workflow and decisions behind snystrom.com.',
};

const content = [
	{
		heading: 'Overview',
		text: (
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi nobis incidunt non modi,
				distinctio ducimus rerum quod{' '}
				<CustomLink href="https://test.com">officiis magni</CustomLink> similique expedita
				blanditiis culpa et soluta amet atque quaerat totam laborum?
			</p>
		),
	},
	{
		heading: 'Typography',
		text: (
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi nobis incidunt non modi,
				distinctio ducimus rerum quod{' '}
				<CustomLink href="https://test.com">officiis magni</CustomLink> similique expedita
				blanditiis culpa et soluta amet atque quaerat totam laborum?
			</p>
		),
	},
	{
		heading: 'Design & Colors',
		text: (
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi nobis incidunt non modi,
				distinctio ducimus rerum quod{' '}
				<CustomLink href="https://test.com">officiis magni</CustomLink> similique expedita
				blanditiis culpa et soluta amet atque quaerat totam laborum?
			</p>
		),
	},
];

export default function Colophon() {
	return (
		<main className="grow max-w-screen-lg mx-auto pt-32 sm:pt-40">
			<PageHeader
				title="Colophon"
				content="A summary of the technologies, design, workflow and decisions behind my website."
			/>
			<div className="pt-8 sm:pt-12 space-y-10 overflow-y-visible">
				{content.map((c) => (
					<div key={c.heading} className="sm:grid grid-cols-12 gap-2 animate-slide">
						<h2 className="text-lg col-span-4 pb-2">{c.heading}</h2>
						<div className="col-span-8 text-foreground-secondary">{c.text}</div>
					</div>
				))}

				<hr className="animate-slide" />

				{/* TYPOGRAPHY */}
				<div className="sm:grid grid-cols-12 gap-2 xs:pt-5 animate-slide">
					<p className="col-span-9 text-lg xs:text-2xl tracking-normal xs:tracking-wide font-medium">
						ABCDEFGHIJKLMNOPQRSTUVWXYZ
						<br />
						abcdefghijklmnopqrstuvwxyz
						<br />
						1234567890
					</p>
					<div className="col-span-3 text-pretty text-foreground-secondary self-end justify-self-end text-sm text-right">
						General Sans
					</div>
				</div>
				<div className="flex flex-col sm:grid grid-cols-12 gap-2 font-mono xs:pb-5 animate-slide">
					<p className="col-span-9 text-lg xs:text-2xl tracking-normal xs:tracking-wide font-medium">
						ABCDEFGHIJKLMNOPQRSTUVWXYZ
						<br />
						abcdefghijklmnopqrstuvwxyz
						<br />
						1234567890
					</p>
					<div className="col-span-3 text-pretty text-foreground-secondary self-end justify-self-end text-sm tracking-tight text-right">
						Jetbrains Mono
					</div>
				</div>

				<hr />

				{/* COLOR SWATCHES */}
				<div className="sm:grid grid-cols-12 space-y-4 sm:space-y-0 gap-4 xs:py-5 animate-slide">
					<div className="col-span-4 flex flex-col rounded-xl bg-background-tertiary border h-44">
						<div className="bg-brand w-full h-3/4 border-b rounded-t-xl text-sm font-medium flex items-center justify-center">
							<span className="hidden dark:block">Sky Dancer</span>
							<span className="block dark:hidden text-foreground-inverse">Bluetiful</span>
						</div>
						<div className="mt-auto w-full h-1/4 px-3 flex justify-between items-center text-sm text-foreground-secondary">
							<span>Brand</span>
							<span className="hidden dark:block">#5286FF</span>
							<span className="block dark:hidden">#2663F2</span>
						</div>
					</div>
					<div className="col-span-4 flex flex-col rounded-xl bg-background-tertiary border h-44">
						<div className="bg-background w-full h-3/4 border-b rounded-t-xl text-sm font-medium flex items-center justify-center">
							<span className="hidden dark:block">Metal</span>
							<span className="block dark:hidden">Salt</span>
						</div>
						<div className="mt-auto w-full h-1/4 px-3 flex justify-between items-center text-sm text-foreground-secondary">
							<span>Backgrounds</span>
							<span className="hidden dark:block">#0F1114</span>
							<span className="block dark:hidden">#EEEEE7</span>
						</div>
					</div>
					<div className="col-span-4 flex flex-col rounded-xl bg-background-tertiary border h-44">
						<div className="bg-foreground text-foreground-inverse w-full h-3/4 border-b text-sm font-medium rounded-t-xl flex items-center justify-center">
							<span className="hidden dark:block">Pearl</span>
							<span className="block dark:hidden">Charcoal</span>
						</div>
						<div className="mt-auto w-full h-1/4 px-3 flex justify-between items-center text-sm text-foreground-secondary">
							<span>Foregrounds</span>
							<span className="hidden dark:block">#F0F0EA</span>
							<span className="block dark:hidden">#212121</span>
						</div>
					</div>
				</div>

				{/* LOGO */}
				<div className="grid grid-cols-3 min-h-64 place-content-center place-items-center rounded-xl border my-10 bg-gradient-to-br from-background-tertiary to-background-tertiary/10 bg-clip-padding">
					<div className="col-span-1">
						<Logo />
					</div>

					<div className="col-span-2 border-l pl-5 pr-2 py-4 md:pr-12">
						<p className="text-foreground-secondary text-sm leading-relaxed">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus expedita
							repudiandae earum quidem. Consectetur est minus similique ipsum assumenda, illo non
							nobis libero odit blanditiis dolorum incidunt officiis asperiores quidem?
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}
