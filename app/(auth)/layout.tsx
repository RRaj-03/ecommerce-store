import getStores from "@/actions/getStore";
import getTheme from "@/actions/getTheme";
import { ThemeInjector } from "@/components/theme-injector";
import React from "react";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = await getStores();
  const theme = await getTheme();

  return (
    <>
      <ThemeInjector theme={theme} />
      {/* Pass store data via a hidden div so client pages can read store name/logo from DOM */}
      <div
        id="store-meta"
        data-name={store?.name ?? ""}
        data-logo={store?.images?.[0]?.url ?? ""}
        className="hidden"
      />
      {children}
    </>
  );
}
