"use client";
import "./globals.css";
import { Urbanist } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import ToastProvider from "@/providers/toastProvider";
const font = Urbanist({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SessionProvider>
			<html lang="en">
				<body className={font.className}>
					<ToastProvider />

					{children}
				</body>
			</html>
		</SessionProvider>
	);
}
