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
    <>
      <header className="bg-background/75 sticky top-0 z-40 border-b border-border/70 backdrop-blur-xl">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6"
          aria-label="Main"
        >
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <Link
              className="text-lg font-semibold tracking-[0.18em] uppercase"
              href="/"
            >
              Studio Shop
            </Link>
            <div className="bg-border/70 hidden h-8 w-px sm:block" aria-hidden />
            <p className="text-muted-foreground hidden text-xs tracking-[0.26em] uppercase sm:block">
              Curated essentials
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button asChild variant="ghost" size="sm" className="text-xs uppercase tracking-[0.2em]">
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
              className="gap-2 border-border/70 bg-background/85 pl-3"
            >
              <ShoppingCart size={18} aria-hidden />
              <span className="hidden text-xs uppercase tracking-[0.2em] sm:inline">
                Cart
              </span>
              <span className="bg-secondary text-secondary-foreground rounded-full px-2 py-0.5 text-[11px] font-semibold tabular-nums">
                {totalItems}
              </span>
            </Button>
          </div>
        </nav>
      </header>
      <CartDrawer id="cart-drawer" isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
