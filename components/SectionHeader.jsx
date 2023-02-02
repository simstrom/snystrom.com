import LinkArrow from './LinkArrow';

export default function SectionHeader({ num, btnText, href, children }) {
	return (
		<div className="w-full flex tems-baseline mb-6 border-b border-black-opaque-100 dark:border-gray-opaque-100">
			<div className="flex items-baseline gap-2 pb-2">
				<div className="font-bold uppercase tracking-widest text-emerald-500">{num}.</div>
				<h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{children}</h2>
			</div>

			{href && <LinkArrow text={btnText} href={href} sm={false} />}
		</div>
	);
}
