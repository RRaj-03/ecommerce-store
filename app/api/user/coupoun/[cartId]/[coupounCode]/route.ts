import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { cartId: string; coupounCode: string } }
) {
	try {
		const token = req.cookies.get("next-auth.session-token")?.value;
		const res = await axios.delete(
			`http://localhost:3000/api/user/coupoun/${params.cartId}/${params.coupounCode}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return NextResponse.json(
			{ message: res.data.message, ...res.data },
			{ status: res.status }
		);
	} catch (error: any) {
		console.log("[error cart GET]", error);
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

export async function POST(
	req: NextRequest,
	{ params }: { params: { cartId: string; coupounCode: string } }
) {
	try {
		const body = await req.json();
		body.token = req.cookies.get("next-auth.session-token")?.value;
		const res = await axios.post(
			`http://localhost:3000/api/user/coupoun/${params?.cartId}/${params?.coupounCode}`,
			body
		);
		return NextResponse.json(
			{ message: res.data.message, ...res.data },
			{ status: res.status }
		);
	} catch (error: any) {
		console.log("[error cart POST]", error);
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
