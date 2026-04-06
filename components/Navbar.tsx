"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/features/cart/CartContext";
import CartDrawer from "@/features/cart/CartDrawer";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { state } = useCart();
  const [open, setOpen] = useState(false);

  const totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-background/80 sticky top-0 z-40 border-b backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6"
        aria-label="Main"
      >
        <Link
          className="text-lg font-semibold tracking-tight"
          href="/"
        >
          Studio Shop
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link href="/checkout">Checkout</Link>
          </Button>

          <Button
            aria-expanded={open}
            aria-haspopup="dialog"
            aria-controls="cart-drawer"
            onClick={() => setOpen(true)}
            type="button"
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <ShoppingCart size={18} aria-hidden />
            <span className="hidden sm:inline">Cart</span>
            <span className="tabular-nums">({totalItems})</span>
          </Button>
        </div>
      </nav>

      <CartDrawer id="cart-drawer" isOpen={open} onClose={() => setOpen(false)} />
    </header>
  );
}
