import "./globals.css";
import { Playfair_Display, Montserrat } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "Marbella Jamaica | Exclusive Luxury Residences",
  description:
    "Marbella offers unparalleled luxury residences in Kingston, Jamaica with bespoke amenities and sophisticated design. Experience the height of refined living.",
  keywords:
    "luxury residences, Kingston, Jamaica, real estate, Marbella, exclusive property, premium apartments",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16" },
      { url: "/icon.png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${playfair.variable} ${montserrat.variable}`}
    >
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
