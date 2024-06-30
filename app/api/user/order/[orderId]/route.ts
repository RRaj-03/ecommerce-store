import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: { orderId: string } }
) {
	try {
		const token = req.cookies.get("next-auth.session-token")?.value;
		const res = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/orders/${params.orderId}`,
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			}
		);
		return NextResponse.json(
			{ message: res.data.message, ...res.data },
			{ status: res.status }
		);
	} catch (error: any) {
		// console.log("[error Address GET]", error);
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
