import { NextResponse } from "next/server";

export async function GET() {
	try {
		const res = await fetch("https://mongo-proxy-test.vercel.app/api/ping" );
		const data = await res.json();
		return NextResponse.json({ success: true, data });
	} catch (err: any) {
		return NextResponse.json(
			{ success: false, error: err.message },
			{ status: 500 }
		);
	}
}