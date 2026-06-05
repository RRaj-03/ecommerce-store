import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/themeProvider";
import ToastProvider from "@/providers/toastProvider";

const font = { className: "font-sans" };

export const metadata: Metadata = {
  title: "Store",
  description: "Store",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ToastProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
