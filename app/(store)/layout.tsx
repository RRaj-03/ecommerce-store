import getStores from "@/actions/getStore";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ModalProvider from "@/providers/modalProvider";
import ToastProvider from "@/providers/toastProvider";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = await getStores();
  return (
    <html lang="en">
      <body>
        <ToastProvider />
        <ModalProvider />
        <Navbar />
        {children}
        <Footer store={store} />
      </body>
    </html>
  );
}
