import { Numans, Poppins } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const numans = Numans({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-numans",
});
