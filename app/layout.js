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
