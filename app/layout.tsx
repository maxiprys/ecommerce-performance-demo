import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/features/cart/CartContext";
import { ProductsProvider } from "@/features/products/ProductsContext";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "Studio Shop",
  description: "A refined e-commerce demo built for smooth product discovery.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="relative">
        <a
          className="bg-background focus-visible:ring-ring absolute top-3 left-4 z-100 -translate-y-[120%] rounded-md px-4 py-2 text-sm font-medium opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:ring-2"
          href="#main-content"
        >
          Skip to content
        </a>
        <ProductsProvider>
          <CartProvider>
            <Navbar />
            <main className="mx-auto w-full max-w-7xl" id="main-content">
              {children}
            </main>
          </CartProvider>
        </ProductsProvider>
      </body>
    </html>
  );
}
