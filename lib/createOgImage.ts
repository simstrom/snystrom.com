// Thank you Delba ( https://delba.dev/ ) for inspiration to this magnificent solution

// PUBLIC IDs from cloudinary
const baseImages = ['og-variant-1.jpg', 'og-variant-2.jpg', 'og-variant-3.jpg'];

export const createOgImage = ({ title, meta }: { title: string; meta: string }) => {
	const randomImage = baseImages[Math.floor(Math.random() * baseImages.length)];

	return [
		`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,

		`w_1600,h_836,q_100`,

		// TITLE
		`l_text:GeneralSans.woff2_72_medium:${e(title)},co_rgb:e9f0ff,c_fit,w_1400,h_240`,
		`fl_layer_apply,g_south_west,x_100,y_180`,

		// META
		`l_text:GeneralSans.woff2_48:${e(meta)},co_rgb:e9f0ff80,c_fit,w_1400`,
		`fl_layer_apply,g_south_west,x_100,y_100`,

		// BG
		randomImage,
	].join('/');
};

const e = (str: string) => encodeURIComponent(encodeURIComponent(str));
