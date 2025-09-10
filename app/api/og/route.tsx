import { SITE_URL } from '@/data/constants';
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

const loadFont = () =>
	fetch(`${SITE_URL}/fonts/GeneralSans-Medium.woff`).then((res) => {
		if (!res.ok) throw new Error('Failed to fetch the font file');
		return res.arrayBuffer();
	});

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);

		const title = searchParams.get('title') || 'Blog Post';
		const tags = searchParams.get('tags') || '';
		const imagePath = searchParams.get('image') || '';

		const tagList = tags
			.split(',')
			.map((tag) => tag.trim())
			.filter((tag) => tag.length > 0);

		const imageUrl = imagePath && `${SITE_URL}${imagePath}`;

		return new ImageResponse(
			(
				<div tw="w-full h-full flex relative" style={{ fontFamily: 'General Sans' }}>
					{imageUrl ? (
						<img
							style={{ objectFit: 'cover', width: '100%', objectPosition: 'center' }}
							width={1200}
							height={630}
							src={imageUrl}
							alt="Article image"
						/>
					) : (
						<div
							tw="absolute w-full h-full"
							style={{
								backgroundColor: '#2663f2',
							}}
						/>
					)}
					<img
						tw="absolute top-0 left-0 w-full h-full"
						src={`${SITE_URL}/images/og-overlay.png`}
						alt="Overlay"
					/>

					<span tw="absolute left-[40.5px] top-12 h-px w-4 bg-white" />
					<span tw="absolute left-[48px] top-[40.5px] h-4 w-px bg-white" />

					<span tw="absolute right-[40.5px] top-12 h-px w-4 bg-white" />
					<span tw="absolute right-[48px] top-[40.5px] h-4 w-px bg-white" />

					<span tw="absolute bottom-12 left-[40.5px] h-px w-4 bg-white" />
					<span tw="absolute bottom-[40.5px] left-[48px] h-4 w-px bg-white" />

					<span tw="absolute bottom-12 right-[40.5px] h-px w-4 bg-white" />
					<span tw="absolute bottom-[40.5px] right-[48px] h-4 w-px bg-white" />

					<span tw="absolute h-px w-full bg-white/30 top-12" />
					<span tw="absolute h-px w-full bg-white/30 bottom-12" />
					<span tw="absolute h-full w-px bg-white/30 left-12" />
					<span tw="absolute h-full w-px bg-white/30 right-12" />

					<div tw="absolute left-20 bottom-16 w-full h-full flex flex-col justify-end">
						<div tw="uppercase flex items-center">
							{tagList.map((tag, index) => (
								<span key={index} tw="px-6 py-2 mr-5 rounded-sm bg-white text-black">
									# {tag}
								</span>
							))}
						</div>
						<h1 tw="w-full text-white text-6xl text-balance max-w-4xl">{title}</h1>
					</div>
				</div>
			),
			{
				width: 1200,
				height: 630,
				fonts: [
					{
						name: 'General Sans',
						data: await loadFont(),
						style: 'normal',
					},
				],
			}
		);
	} catch (error) {
		console.error('Error generating OG image:', error);
		return new Response('Failed to generate OG image', { status: 500 });
	}
}
