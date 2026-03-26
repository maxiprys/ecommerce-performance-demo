import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/features/cart/CartContext";

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
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main className="max-w-6xl mx-auto">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}