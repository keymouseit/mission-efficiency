import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import { DrupalService } from "@/services";
import Footer from "@/components/layout/Footer";
import { Numans, Open_Sans, Poppins } from "next/font/google";

const numans = Numans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-numans",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-open-sans",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mission Efficiency",
  description: "A Tool to help you discover opportunities",
  openGraph: {
    title: "Mission Efficiency",
    description: "A Tool to help you discover opportunities",
    images: ["https://missionefficiency.org/assets/Uploads/ME-social-v3.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const footerSection = await DrupalService.getFooterSection();
  const menuData = await DrupalService.getMenuData();

  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${openSans.variable} ${numans.variable} antialiased`}
      >
        <Header data={menuData} />
        {children}
        <Footer data={footerSection[0]} />
      </body>
    </html>
  );
}
