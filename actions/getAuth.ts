import { authConfig } from "@/auth.config";
import axios from "axios";
import { getServerSession } from "next-auth";

export const auth = async () => {
	const session: any = await getServerSession(authConfig);
	try {
		if (!session) {
			return { userId: undefined, email: undefined };
		}
		return {
			...session.User,
			userId: session.User.id,
		};
	} catch (error) {
		return { userId: undefined, email: undefined };
	}
};
