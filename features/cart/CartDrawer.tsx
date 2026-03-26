"use client";

import { useCart } from "./CartContext";
import { formatPrice } from "@/lib/formatPrice";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartDrawer({ isOpen, onClose }: Props) {
  const { state, removeItem } = useCart();

  const total = state.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      )}

      <div
        className={`z-1 fixed top-0 right-0 h-full w-80 bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex justify-between">
          <h2 className="font-bold text-lg text-black">Cart</h2>
          <button onClick={onClose} className="text-black cursor-pointer">
            ✕
          </button>
        </div>

        <div className="p-4 space-y-4">
          {state.items.length === 0 && (
            <p className="text-gray-500">Your cart is empty</p>
          )}

          {state.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  {item.quantity} x {formatPrice(item.price)}
                </p>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 text-sm cursor-pointer"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="p-4 border-t mt-auto">
          <p className="font-bold mb-2">Total: {formatPrice(total)}</p>

          <button className="w-full bg-black text-white py-2 rounded cursor-pointer">
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}
