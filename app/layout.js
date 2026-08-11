import "./globals.css";
import { Fraunces, Inter } from "next/font/google";

const playfair = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

const montserrat = Inter({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "Marbella Jamaica | Exclusive Luxury Residences",
  description:
    "Marbella offers unparalleled luxury residences in Kingston, Jamaica with bespoke amenities and sophisticated design. Experience the height of refined living.",
  keywords:
    "luxury residences, Kingston, Jamaica, real estate, Marbella, exclusive property, premium apartments",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`scroll-smooth bg-background ${playfair.variable} ${montserrat.variable}`}
    >
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
