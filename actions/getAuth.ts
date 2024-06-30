import { authConfig } from "@/auth.config";
import axios from "axios";
import { getServerSession } from "next-auth";

export const auth = async () => {
	const session = await getServerSession(authConfig);
	try {
		if (!session) {
			return { userId: undefined, email: undefined };
		}
		const res = await axios.post("http://localhost:3000/api/user", {
			email: session.user!.email,
		});
		if (!res.data.user) return { userId: undefined, email: undefined };
		return {
			...res.data.user,
			userId: res.data.user.id,
		};
	} catch (error) {
		return { userId: undefined, email: undefined };
	}
};
