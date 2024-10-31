import db from '@/lib/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
	const authHeader = req.headers.get('authorization');
	if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
		return new Response('Unauthorized', {
			status: 401,
		});
	}

	try {
		// Fetch mock data to prevent Supabase project from pausing
		const { error } = await db.from('articles').select().limit(1);
		if (error) throw new Error(error.message);

		return NextResponse.json({ status: 'success' }, { status: 200 });
	} catch (error) {
		const message = (error as Error).message ?? 'An error occurred.';
		return NextResponse.json({ error: message }, { status: 500 });
	}
}
