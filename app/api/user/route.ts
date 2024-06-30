import { auth } from "@/actions/getAuth";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
	// This is a PUT request
	try {
		const body = await req.json();

		body.token = req.cookies.get("next-auth.session-token")?.value;

		const updatedUser = await axios.put("http://localhost:3000/api/user", body);
		return NextResponse.json(
			{
				message: "User Updated",
				updatedUser: updatedUser.data.updatedUser,
				...updatedUser.data,
			},
			{ status: 200 }
		);
	} catch (error: any) {
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
