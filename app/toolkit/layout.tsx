import AppMenu from "@/components/AppMenu/AppMenu";
import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Toolkit - Mission Efficiency",
  description: "A Tool to help you discover opportunities",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppMenu />
      {children}
      <Footer />
    </>
  );
}
