"use client";

import { useCart } from "@/features/cart/CartContext";

export default function Navbar() {
  const { state } = useCart();

  const totalItems = state.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <nav className="p-4 border-b mb-6 flex justify-between">
      <h1 className="text-xl font-bold">E-commerce Demo</h1>
      <span>Cart ({totalItems})</span>
    </nav>
  );
}