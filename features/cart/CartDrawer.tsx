"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "./CartContext";
import { formatPrice } from "@/lib/formatPrice";
import { Button } from "@/components/ui/button";

type Props = {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function CartDrawer({ id, isOpen, onClose }: Props) {
  const { state, removeItem, increaseItem, decreaseItem } = useCart();

  const total = state.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      {isOpen && (
        <button
          aria-label="Close cart overlay"
          className="fixed inset-0 z-50 bg-black/40"
          onClick={onClose}
          type="button"
        />
      )}

      <div
        className={`fixed top-0 right-0 z-50 flex w-full max-w-md min-h-screen flex-col border-l border-zinc-200 bg-white text-zinc-900 shadow-2xl transition-transform duration-300 ease-in-out dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-labelledby={id ? `${id}-title` : undefined}
      >
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
          <h2
            className="text-lg font-semibold"
            id={id ? `${id}-title` : undefined}
          >
            Cart
          </h2>
          <button
            className="rounded-md p-1.5 transition hover:bg-zinc-100 dark:hover:bg-zinc-900"
            onClick={onClose}
            type="button"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        <div className="min-h-[240px] flex-1 space-y-4 overflow-y-auto px-5 py-4">
          {state.items.length === 0 && (
            <p className="text-muted-foreground text-sm">Your cart is empty</p>
          )}

          {state.items.map((item) => (
            <div
              key={item.id}
              className="animate-in fade-in-0 slide-in-from-bottom-1 flex items-start gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3 duration-200 dark:border-zinc-800 dark:bg-zinc-900/60"
            >
              <div className="flex min-w-0 flex-1 gap-3">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-white dark:bg-zinc-950">
                  <span className="relative block size-full" aria-hidden>
                    {item.image ? (
                      <Image
                        alt=""
                        className="object-cover"
                        fill
                        sizes="56px"
                        src={item.image}
                      />
                    ) : (
                      <Image
                        alt=""
                        className="object-contain p-1"
                        fill
                        sizes="56px"
                        src="/images/placeholder.svg"
                      />
                    )}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="line-clamp-2 text-sm font-medium leading-snug">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    {item.quantity} × {formatPrice(item.price)}
                  </p>
                  <div className="mt-2 inline-flex items-center rounded-md border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-950">
                    <button
                      aria-label={`Decrease ${item.title} quantity`}
                      className="px-2 py-1 text-sm transition hover:bg-zinc-100 dark:hover:bg-zinc-900"
                      onClick={() => decreaseItem(item.id)}
                      type="button"
                    >
                      -
                    </button>
                    <span className="min-w-8 text-center text-sm font-medium tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      aria-label={`Increase ${item.title} quantity`}
                      className="px-2 py-1 text-sm transition hover:bg-zinc-100 dark:hover:bg-zinc-900"
                      onClick={() => increaseItem(item.id)}
                      type="button"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button
                className="shrink-0 rounded-md px-2 py-1 text-sm text-red-600 transition hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/40 dark:hover:text-red-300"
                onClick={() => removeItem(item.id)}
                type="button"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="border-t border-zinc-200 px-5 py-4 dark:border-zinc-800">
          <p className="mb-3 text-base font-semibold">
            Total: {formatPrice(total)}
          </p>

          {state.items.length === 0 ? (
            <Button className="w-full" disabled type="button">
              Go to checkout
            </Button>
          ) : (
            <Button asChild className="w-full">
              <Link href="/checkout" onClick={onClose}>
                Go to checkout
              </Link>
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
