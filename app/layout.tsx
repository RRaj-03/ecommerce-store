import "./globals.css";
import { Urbanist } from "next/font/google";
import ToastProvider from "@/providers/toastProvider";
import SessionProvider from "@/providers/sessionProvider";
import { auth } from "@/actions/getAuth";
import { ThemeProvider } from "@/providers/themeProvider";
const font = Urbanist({ subsets: ["latin"] });

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { theme = "system" } = await auth();
	return (
		<html lang="en">
			<body className={font.className}>
				<SessionProvider>
					<ThemeProvider attribute="class" defaultTheme={theme} enableSystem>
						<ToastProvider />

						{children}
					</ThemeProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
