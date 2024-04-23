'use server';

import { unstable_noStore as noStore } from 'next/cache';
import db from './server';
//sendEmail

export async function incrementViews(slug: string) {
	if (process.env.NODE_ENV !== 'production') {
		return;
	}
	noStore();
	await db.rpc('incrementviews', { id: slug });
}

export async function incrementLikes(slug: string) {
	if (process.env.NODE_ENV !== 'production') {
		return;
	}
	noStore();
	await db.rpc('incrementlikes', { id: slug });
}
