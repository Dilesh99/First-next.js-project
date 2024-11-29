"use client";
import { usePathname } from 'next/navigation';
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Routes without header and footer
  const noHeaderFooterRoutes = ['/userlogin', '/sellerlogin', '/userregister', '/sellerregistration'];
  const shouldRenderHeaderFooter = !noHeaderFooterRoutes.includes(pathname);

  return (
    <html lang="en">
      <head>
        <title>Heritage Link</title>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body>
        {shouldRenderHeaderFooter && <Navbar />}
        <main>{children}</main>
        {shouldRenderHeaderFooter && <Footer />}
      </body>
    </html>
  );
}
