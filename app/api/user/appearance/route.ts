import { auth } from "@/actions/getAuth";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		body.token = req.cookies.get("next-auth.session-token")?.value;

		const res = await axios.post(
			"http://localhost:3000/api/user/appearance",
			body
		);
		return NextResponse.json(
			{ message: res.data.message, ...res.data },
			{ status: res.status }
		);
	} catch (error: any) {
		console.log("error [user appearance Post]:", error);
		if (error?.response?.status) {
			return NextResponse.json(
				{
					message: error.response.data?.message || "Internal Server Error",
					error: error.response.data?.error || error,
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
