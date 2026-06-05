import getStores from "@/actions/getStore";
import getTheme from "@/actions/getTheme";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ThemeInjector } from "@/components/theme-injector";
import ModalProvider from "@/providers/modalProvider";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = await getStores();
  const theme = await getTheme();

  return (
    <>
      <ThemeInjector theme={theme} />
      <ModalProvider />
      <Navbar />
      {children}
      <Footer store={store} />
    </>
  );
}
