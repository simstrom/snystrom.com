import CustomLink from '@/components/blog/link';
import PageHeader from '@/components/ui/pageHeader';
import { Logo } from '@/lib/icons';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Colophon',
	description: 'A summary of the technologies, design, workflow and decisions behind snystrom.com.',
};

export default function Colophon() {
	return (
		<main className="max-w-3xl mx-auto pt-32 sm:pt-40 overflow-x-hidden">
			<PageHeader
				title="Colophon"
				content="A summary of the technologies, design, workflow and decisions behind my website."
			/>
			<div className="pt-8 sm:pt-12 space-y-10">
				<div className="sm:grid grid-cols-12 gap-2">
					<h2 className="col-span-3 pb-2">Overview</h2>
					<p className="text-sm leading-7 col-span-9 text-pretty text-foreground-secondary">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi nobis incidunt non modi,
						distinctio ducimus rerum quod officiis magni similique expedita blanditiis culpa et
						soluta amet atque quaerat totam laborum?
					</p>
				</div>
				<div className="sm:grid grid-cols-12 gap-2">
					<h2 className="col-span-3 pb-2">Typography</h2>
					<p className="text-sm leading-7 col-span-9 text-pretty text-foreground-secondary">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi nobis incidunt non modi,
						distinctio ducimus rerum quod officiis magni similique expedita blanditiis culpa et
						soluta amet atque quaerat totam laborum?
					</p>
				</div>
				<div className="sm:grid grid-cols-12 gap-2">
					<h2 className="col-span-3 pb-2">Design & Colors</h2>
					<p className="text-sm leading-7 col-span-9 text-pretty text-foreground-secondary">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi nobis incidunt non modi,
						distinctio ducimus rerum quod{' '}
						<CustomLink href="https://test.com">officiis magni</CustomLink> similique expedita
						blanditiis culpa et soluta amet atque quaerat totam laborum?
					</p>
				</div>

				<hr />

				{/* TYPOGRAPHY */}
				<div className="sm:grid grid-cols-12 gap-2 xs:pt-5">
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
				<div className="flex flex-col sm:grid grid-cols-12 gap-2 font-mono xs:pb-5">
					<p className="col-span-9 text-lg xs:text-2xl tracking-normal xs:tracking-wide font-medium">
						ABCDEFGHIJKLMNOPQRSTUVWXYZ
						<br />
						abcdefghijklmnopqrstuvwxyz
						<br />
						1234567890
					</p>
					<div className="col-span-3 text-pretty text-foreground-secondary self-end justify-self-end text-sm tracking-tight text-right">
						Cousine
					</div>
				</div>

				<hr />

				{/* COLOR SWATCHES */}
				<div className="sm:grid grid-cols-12 space-y-4 sm:space-y-0 gap-4 xs:py-5">
					<div className="col-span-4 flex flex-col rounded-xl bg-background-tertiary border h-44">
						<div className="bg-brand w-full h-3/4 border-b rounded-t-xl text-sm font-medium flex items-center justify-center">
							<span className="hidden dark:block">Sky Dancer</span>
							<span className="block dark:hidden text-foreground-inverse">Bluetiful</span>
						</div>
						<div className="mt-auto w-full h-1/4 px-3 flex justify-between items-center font-mono text-xs tracking-tight text-foreground-secondary">
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
						<div className="mt-auto w-full h-1/4 px-3 flex justify-between items-center font-mono text-xs tracking-tight text-foreground-secondary">
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
						<div className="mt-auto w-full h-1/4 px-3 flex justify-between items-center font-mono text-xs tracking-tight text-foreground-secondary">
							<span>Foregrounds</span>
							<span className="hidden dark:block">#F0F0EA</span>
							<span className="block dark:hidden">#212121</span>
						</div>
					</div>
				</div>

				{/* LOGOS */}
				<div className="grid grid-cols-2 h-[450px] rounded-xl border my-10 relative overflow-hidden">
					<div className="col-span-1 bg-background rounded-tl-xl flex items-center justify-center">
						<Logo />
					</div>
					<div className="col-span-1 bg-foreground rounded-tr-xl flex items-center justify-center">
						<Logo className="text-foreground-inverse" />
					</div>
					<div className="col-span-1 bg-foreground rounded-bl-xl flex items-center justify-center">
						<Logo className="text-brand-secondary dark:text-brand" />
					</div>
					<div className="col-span-1 bg-brand-secondary dark:bg-brand rounded-br-xl flex items-center justify-center">
						<Logo className="text-foreground-inverse dark:text-foreground" />
					</div>
					<div className="hidden lg:block absolute inset-0 w-full h-full">
						<div className="h-[77px] w-full border-b absolute"></div>
						<div className="h-[148px] w-full border-b absolute"></div>
						<div className="bottom-0 h-[77px] w-full border-t absolute"></div>
						<div className="bottom-0 h-[148px] w-full border-t absolute"></div>
						<div className="left-0 h-full w-[157px] border-r absolute"></div>
						<div className="left-0 h-full w-[228px] border-r absolute"></div>
						<div className="right-0 h-full w-[157px] border-l absolute"></div>
						<div className="right-0 h-full w-[228px] border-l absolute"></div>
					</div>
				</div>
			</div>
		</main>
	);
}
