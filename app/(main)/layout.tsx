import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "@/components/Provider";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
        <Script
          src="https://kit.fontawesome.com/3d5c46f6e6.js"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-slate-100">
        <Provider>
          <>
            <NavBar />
            {children}
            <Footer />
          </>
          <Toaster position="top-center" reverseOrder={false} />
        </Provider>
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
