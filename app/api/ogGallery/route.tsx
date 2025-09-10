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

		const title = searchParams.get('title') || 'Gallery';
		const subtitle = searchParams.get('subtitle') || 'Photo Gallery';
		const imageUrl = searchParams.get('image') || '';

		return new ImageResponse(
			(
				<div tw="w-full h-full flex items-center relative" style={{ fontFamily: 'General Sans' }}>
					<img
						tw="absolute top-0 left-0 w-full h-full"
						src={`${SITE_URL}/images/og-gallery.jpg`}
						alt="Overlay"
					/>

					<img
						style={{
							objectFit: 'cover',
							objectPosition: 'center',
							border: '5px solid black',
							position: 'absolute',
							right: '72px',
						}}
						width={400}
						height={500}
						src={imageUrl}
						alt="Gallery image"
					/>

					<span tw="absolute left-[40.5px] top-12 h-px w-4 bg-black" />
					<span tw="absolute left-[48px] top-[40.5px] h-4 w-px bg-black" />

					<span tw="absolute right-[40.5px] top-12 h-px w-4 bg-black" />
					<span tw="absolute right-[48px] top-[40.5px] h-4 w-px bg-black" />

					<span tw="absolute bottom-12 left-[40.5px] h-px w-4 bg-black" />
					<span tw="absolute bottom-[40.5px] left-[48px] h-4 w-px bg-black" />

					<span tw="absolute bottom-12 right-[40.5px] h-px w-4 bg-black" />
					<span tw="absolute bottom-[40.5px] right-[48px] h-4 w-px bg-black" />

					<span tw="absolute h-px w-full bg-black/30 top-12" />
					<span tw="absolute h-px w-full bg-black/30 bottom-12" />
					<span tw="absolute h-full w-px bg-black/30 left-12" />
					<span tw="absolute h-full w-px bg-black/30 right-12" />

					<div tw="absolute left-20 bottom-20 w-1/2 h-full flex flex-col justify-end">
						<h1 tw="w-full text-black text-7xl text-balance">{title}</h1>
						<div style={{ color: '#6a7282', fontSize: 32 }}>{subtitle}</div>
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
