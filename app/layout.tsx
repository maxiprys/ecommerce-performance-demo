import "./globals.css";
import Navbar from "@/components/Navbar";

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
        <Navbar />
        <main className="max-w-6xl mx-auto">{children}</main>
      </body>
    </html>
  );
}