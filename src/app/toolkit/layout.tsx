import AppMenu from "@/components/sections/AppMenu";
import type { Metadata } from "next";

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
    </>
  );
}
