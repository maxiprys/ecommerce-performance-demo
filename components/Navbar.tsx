"use client";

import { useState } from "react";
import { useCart } from "@/features/cart/CartContext";
import CartDrawer from "@/features/cart/CartDrawer";

export default function Navbar() {
  const { state } = useCart();
  const [open, setOpen] = useState(false);
    
  const totalItems = state.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <nav className="p-4 border-b mb-6 flex justify-between">
      <h1 className="text-xl font-bold">E-commerce Demo</h1>

      <button onClick={() => setOpen(true)} className="cursor-pointer">
          Cart ({totalItems})
        </button>

      <CartDrawer isOpen={open} onClose={() => setOpen(false)} />
    </nav>
  );
}