import type { Account, NextAuthOptions, Profile, User } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { auth } from "@/actions/getAuth";
import bcrypt from "bcryptjs";
export const authConfig: NextAuthOptions = {
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/auth",
		signOut: "/signout",
		error: "/auth",
		newUser: "/auth?newUser=true",
	},
	callbacks: {
		async session({ session, token }) {
			return { ...session, accessToken: token?.accessToken };
		},
		async jwt({ token, account, user, profile, session, trigger }) {
			if (account) {
				token.accessToken = account.access_token;
			}
			return token;
		},
		signIn: async ({ user, account, profile }) => {
			try {
				if (account && account.type === "oauth") {
					const res = await axios.post(
						process.env.NEXT_PUBLIC_BACKEND_URL + "/api/user",
						{
							email: profile!.email,
						}
					);
					const user = res.data.user;
					console.log("user", user);
					if (user) {
						return true;
					}
					const res1 = await axios.post(
						process.env.NEXT_PUBLIC_BACKEND_URL + "/api/signUp",
						{
							email: profile!.email!,
							firstName: profile?.given_name
								? profile?.given_name
								: profile?.name,
							lastName: profile?.family_name ? profile?.family_name : "",
							password: bcrypt.hashSync(profile!.email!, 10),
							isOwner: false,
							image: profile?.picture!,
						}
					);
					const newUser = res1.data.user;
				}
				return true;
			} catch (e: any) {
				console.log("Error at signIn callback", e.message);
				return false;
			}
		},
	},
	secret: process.env.NEXTAUTH_SECRET!,
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
		}),
		// GitHubProvider({
		// 	clientId: process.env.GITHUB_CLIENT_ID!,
		// 	clientSecret: process.env.GITHUB_CLIENT_SECRET!,
		// 	authorization: {
		// 		params: {
		// 			prompt: "consent",
		// 			access_type: "offline",
		// 			response_type: "code",
		// 		},
		// 	},
		// }),
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "email", type: "email", placeholder: "abc@xyz.in" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				if (credentials === null || credentials === undefined) return null;

				if (!credentials.email || !credentials.password) return null;

				try {
					const res = await axios.post(
						process.env.NEXT_PUBLIC_BACKEND_URL + "/api/user",
						{
							email: credentials.email,
						}
					);
					const User = res.data.user;
					if (!User) throw new Error("User not found");
					const passwordMatch = await bcrypt.compare(
						credentials.password,
						User.password
					);
					const newUser = {
						id: User.id,
						email: User.email,
						firstName: User.firstName,
						lastName: User.lastName,
						image: User?.image?.url,
					};
					if (!passwordMatch) throw new Error("Invalid credentials");
					return newUser;
				} catch (e: any) {
					console.log("error authorize providers", e);
					return null;
				}
			},
		}),
	],
};
