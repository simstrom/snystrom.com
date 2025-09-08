import CustomLink from '@/components/blog/link';
import PageHeader from '@/components/ui/pageHeader';
import { Section } from '@/components/ui/section';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Colophon',
	description: 'A summary of the technologies, design, workflow and decisions behind snystrom.com.',
};

export default function Colophon() {
	return (
		<main className="grow">
			<PageHeader
				title="Colophon"
				content="A summary of the technologies, design, workflow and decisions behind my website."
				className="pt-32 pb-12 bg-background-secondary"
			/>

			<Section className="overflow-y-visible px-6 py-10 space-y-8" borderOrigin="y">
				{content.map((c) => (
					<div key={c.heading} className="sm:grid grid-cols-12 gap-2">
						<h2 className="text-xl font-medium col-span-4 pb-2">{c.heading}</h2>
						<p className="col-span-8 leading-7 text-foreground-secondary">{c.text}</p>
					</div>
				))}
			</Section>

			<Section className="pt-10 overflow-y-visible space-y-8" borderOrigin={null}>
				<div className="flex gap-2 px-6">
					<p className="flex-1 text-lg sm:text-2xl tracking-normal sm:tracking-wide font-medium">
						ABCDEFGHIJKLMNOPQRSTUVWXYZ
						<br />
						abcdefghijklmnopqrstuvwxyz
						<br />
						1234567890
					</p>
					<CustomLink
						href="https://www.fontshare.com/?q=General%20Sans"
						className="text-pretty self-end justify-self-end text-sm font-medium text-foreground-secondary text-right"
					>
						General Sans
					</CustomLink>
				</div>

				<div className="flex gap-2 px-6 font-mono">
					<p className="flex-1 text-lg sm:text-2xl tracking-normal sm:tracking-wide font-medium">
						ABCDEFGHIJKLMNOPQRSTUVWXYZ
						<br />
						abcdefghijklmnopqrstuvwxyz
						<br />
						1234567890
					</p>
					<CustomLink
						href={'https://vercel.com/font'}
						className="text-pretty text-foreground-secondary self-end justify-self-end text-sm font-medium text-right"
					>
						Geist Mono
					</CustomLink>
				</div>

				{/* COLOR SWATCHES */}
				<div className="sm:grid grid-cols-12 pt-2 border-b">
					{swatches.map((swatch, i) => (
						<div
							key={swatch.key}
							className={cn(
								'col-span-4 flex flex-col bg-background-secondary h-44 border-t',
								i < 2 && 'border-r'
							)}
						>
							<div
								className={cn(
									'w-full h-3/4 text-sm font-medium flex items-center justify-center rounded-2xl ring-1 ring-border',
									swatch.bgClass
								)}
							>
								<span className="hidden dark:block">{swatch.dark.name}</span>
								<span className={cn('block dark:hidden', swatch.light.textClass)}>
									{swatch.light.name}
								</span>
							</div>
							<div className="mt-auto w-full h-1/4 px-3 flex justify-between items-center text-sm text-foreground-secondary border-t">
								<span>{swatch.label}</span>
								<span className="hidden dark:block">{swatch.dark.color}</span>
								<span className="block dark:hidden">{swatch.light.color}</span>
							</div>
						</div>
					))}
				</div>
			</Section>
		</main>
	);
}

const content = [
	{
		heading: 'Overview',
		text: (
			<>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi nobis incidunt non modi,
				distinctio ducimus rerum quod{' '}
				<CustomLink href="https://test.com">officiis magni</CustomLink> similique expedita
				blanditiis culpa et soluta amet atque quaerat totam laborum?
			</>
		),
	},
	{
		heading: 'Typography',
		text: (
			<>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi nobis incidunt non modi,
				distinctio ducimus rerum quod{' '}
				<CustomLink href="https://test.com">officiis magni</CustomLink> similique expedita
				blanditiis culpa et soluta amet atque quaerat totam laborum?
			</>
		),
	},
	{
		heading: 'Design & Colors',
		text: (
			<>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi nobis incidunt non modi,
				distinctio ducimus rerum quod{' '}
				<CustomLink href="https://test.com">officiis magni</CustomLink> similique expedita
				blanditiis culpa et soluta amet atque quaerat totam laborum?
			</>
		),
	},
];

const swatches = [
	{
		key: 'brand',
		bgClass: 'bg-brand',
		label: 'Brand',
		light: {
			name: 'Bluetiful',
			color: '#2663F2',
			textClass: 'text-background',
		},
		dark: { name: 'Sky Dancer', color: '#5286FF' },
	},
	{
		key: 'backgrounds',
		bgClass: 'bg-background',
		label: 'Backgrounds',
		light: { name: 'Salt', color: '#EEEEE7' },
		dark: { name: 'Metal', color: '#0F1114' },
	},
	{
		key: 'foregrounds',
		bgClass: 'bg-foreground text-background',
		label: 'Foregrounds',
		light: { name: 'Charcoal', color: '#212121' },
		dark: { name: 'Pearl', color: '#F0F0EA' },
	},
];
