import getStores from "@/actions/getStore";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ModalProvider from "@/providers/modalProvider";
import ToastProvider from "@/providers/toastProvider";
export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const store = await getStores();
	return (
		<>
			<ToastProvider />
			<ModalProvider />
			<Navbar />
			{children}
			<Footer store={JSON.parse(JSON.stringify(store))} />
		</>
	);
}
