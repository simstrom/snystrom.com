// Thank you Delba ( https://delba.dev/ ) for inspiration to this magnificent solution

// PUBLIC ID from cloudinary
const BASE_IMAGE = 'og-base.jpg';

export const createOgImage = ({ title, meta }: { title: string; meta: string }) => {
	return [
		`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,

		`w_1200,h_630,q_100`,

		// TITLE
		`l_text:GeneralSans.woff2_48_medium:${e(title)},co_rgb:e9f0ff,c_fit,w_1130,h_200`,
		`fl_layer_apply,g_south_west,x_70,y_160`,

		// META
		`l_text:GeneralSans.woff2_32:${e(meta)},co_rgb:e9f0ff80,c_fit,w_1130`,
		`fl_layer_apply,g_south_west,x_70,y_100`,

		// BG
		BASE_IMAGE,
	].join('/');
};

const e = (str: string) => encodeURIComponent(encodeURIComponent(str));
