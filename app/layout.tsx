import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/features/cart/CartContext";
import { ProductsProvider } from "@/features/products/ProductsContext";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "E-commerce Demo",
  description: "High-performance e-commerce frontend built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <a
          className="bg-background focus-visible:ring-ring absolute top-3 left-4 z-100 -translate-y-[120%] rounded-md px-4 py-2 text-sm font-medium opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:ring-2"
          href="#main-content"
        >
          Skip to content
        </a>
        <ProductsProvider>
          <CartProvider>
            <Navbar />
            <main className="max-w-6xl mx-auto" id="main-content">
              {children}
            </main>
          </CartProvider>
        </ProductsProvider>
      </body>
    </html>
  );
}
