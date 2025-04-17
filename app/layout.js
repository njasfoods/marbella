import "./globals.css"
import { Playfair_Display, Montserrat } from "next/font/google"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export const metadata = {
  title: "The Pinnacle Jamaica | Exclusive Luxury Residences",
  description:
    "The Pinnacle offers unparalleled luxury residences in Kingston, Jamaica with bespoke amenities and sophisticated design. Experience the height of refined living.",
  keywords: "luxury residences, Kingston, Jamaica, real estate, The Pinnacle, exclusive property, premium apartments",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scroll-smooth ${playfair.variable} ${montserrat.variable}`}>
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}
