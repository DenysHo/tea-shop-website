import { Cormorant_Garamond, Jost, Pinyon_Script } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

const body = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-body",
});

const script = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-script",
});

export const metadata = {
  title: `${SITE.name} — Chinese Tea & Tea Ware`,
  description:
    "Chinese tea and traditional tea ware, sourced with care and presented with quiet intention.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${script.variable}`}>
      <body className="bg-paper text-ink font-body font-light antialiased">
        {children}
      </body>
    </html>
  );
}
