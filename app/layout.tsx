import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/features/cart/CartContext";
import { ProductsProvider } from "@/features/products/ProductsContext";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
        <ProductsProvider>
          <CartProvider>
            <Navbar />
            <main className="max-w-6xl mx-auto">{children}</main>
          </CartProvider>
        </ProductsProvider>
      </body>
    </html>
  );
}
