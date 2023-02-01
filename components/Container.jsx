import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Container(props) {
	const router = useRouter();

	const { children, ...metaData } = props;
	const meta = {
		title: 'Simon Nyström - Developer, designer, photographer.',
		description: `Front-end developer with a passion for UI/UX design and photography.`,
		image: 'https://snystrom.com/static/images/simon-banner.png',
		type: 'website',
		...metaData,
	};

	return (
		<div>
			<Head>
				<title>{meta.title}</title>
				<meta name="keywords" content="snystrom, simon nystrom, simstrom" />
				<meta content={meta.description} name="description" />
				<meta name="robots" content="follow, index" />
				<meta property="og:url" content={`https://snystrom.com${router.asPath}`} />
				<link rel="canonical" href={`https://snystrom.com${router.asPath}`} />
				<meta property="og:site_name" content="Simon Nyström" />
				<meta property="og:title" content={meta.title} />
				<meta property="og:description" content={meta.description} />
				<meta property="og:image" content={meta.image} />
				<meta property="og:type" content={meta.type} />
				{meta.date && <meta property="article:published_time" content={meta.date} />}
			</Head>

			<main className="pt-14 md:pt-20 pb-14 md:pb-20 flex flex-col gap-20 md:gap-28">
				{children}
			</main>
		</div>
	);
}
