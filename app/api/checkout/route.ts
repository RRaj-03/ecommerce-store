import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const search = req.nextUrl.search;
		body.token = req.cookies.get("next-auth.session-token")?.value;
		const res = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/checkout/${search}`,
			body
		);
		return NextResponse.json(
			{ message: res.data.message, ...res.data },
			{ status: res.status }
		);
	} catch (error: any) {
		console.log("[error Address POST]", error);
		if (error?.response?.status) {
			return NextResponse.json(
				{
					message: error.response.data?.message || "Internal Server Error",
					error: error.response.data?.error || error,
					...error.response.data,
				},
				{ status: error?.response?.status || 500 }
			);
		}
		return NextResponse.json(
			{ message: "Internal Server Error", error },
			{ status: 500 }
		);
	}
}
