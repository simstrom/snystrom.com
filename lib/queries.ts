'use server';

import { unstable_noStore as noStore } from 'next/cache';
import db from './server';

export async function getPostInteractions(slug: string) {
	noStore();
	const { data } = await db.from('articles').select('views, likes').eq('slug', slug);
	if (!data) return null;
	return data[0];
}

export async function getAllViews() {
	noStore();
	const { data } = await db.from('articles').select('slug, views');
	if (!data) return null;
	return data;
}
