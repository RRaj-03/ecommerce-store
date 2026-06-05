import getStores from "@/actions/getStore";
import getTheme from "@/actions/getTheme";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ThemeInjector } from "@/components/theme-injector";
import ModalProvider from "@/providers/modalProvider";

export default async function DashboardLayout({
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
