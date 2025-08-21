import "./globals.css";
import type { Metadata } from "next";
import { numans, poppins } from "@/lib/fonts";
import ClientErrorBoundary from "@/components/ClientErrorBoundary";

export const metadata: Metadata = {
  title: "Mission Efficiency",
  description: "A Tool to help you discover opportunities",
  openGraph: {
    title: "Mission Efficiency",
    description: "A Tool to help you discover opportunities",
    images: ["https://missionefficiency.org/assets/Uploads/ME-social-v3.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${numans.variable} ${poppins.variable} laptop:!overflow-auto`}
      >
        <ClientErrorBoundary>{children}</ClientErrorBoundary>
      </body>
    </html>
  );
}
