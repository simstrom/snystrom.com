import LinkArrow from './LinkArrow';

export default function SectionHeader({ num, btnText, href, children }) {
	return (
		<div className="w-full flex tems-baseline mb-6 border-b border-primary">
			<h2 className="text-2xl sm:text-3xl">{children}</h2>

			{href && <LinkArrow text={btnText} href={href} sm={false} />}
		</div>
	);
}
