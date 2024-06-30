import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: { AddressId: string } }
) {
	try {
		const token = req.cookies.get("next-auth.session-token")?.value;
		const { AddressId } = params;
		const res = await axios.get(
			`http://localhost:3000/api/user/address/${AddressId}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return {
			status: res.status,
			json: {
				message: res.data.message,
				...res.data,
			},
		};
	} catch (error: any) {
		console.log("[error Address GET]", error);
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

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { AddressId: string } }
) {
	try {
		const token = req.cookies.get("next-auth.session-token")?.value;
		const { AddressId } = params;
		const res = await axios.delete(
			`http://localhost:3000/api/user/address/${AddressId}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return NextResponse.json(
			{
				message: res.data.message,
				...res.data,
			},
			{ status: res.status }
		);
	} catch (error: any) {
		console.log("error [Address Adressid DELETE]", error);
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

export async function PUT(
	req: NextRequest,
	{ params }: { params: { AddressId: string } }
) {
	try {
		const token = req.cookies.get("next-auth.session-token")?.value;
		const { AddressId } = params;
		const body = await req.json();
		const res = await axios.put(
			`http://localhost:3000/api/user/address/${AddressId}`,
			body,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return NextResponse.json(
			{
				message: res.data.message,
				...res.data,
			},
			{
				status: res.status,
			}
		);
	} catch (error: any) {
		console.log("[error Address PUT]", error);
		if (error?.response?.status) {
			return NextResponse.json(
				{
					message: error.response.data?.message || "Internal Server Error",
					error: error.response.data?.error || error,
					...error.response.data,
				},
				{
					status: error?.response?.status || 500,
				}
			);
		}
		return NextResponse.json(
			{
				message: "Internal Server Error",
				error,
			},
			{
				status: 500,
			}
		);
	}
}
