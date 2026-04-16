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
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
          type="button"
        />
      )}

      <div
        className={`bg-background text-foreground fixed top-0 right-0 z-50 flex min-h-screen w-full max-w-md flex-col border-l border-border/70 shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-labelledby={id ? `${id}-title` : undefined}
      >
        <div className="flex items-center justify-between border-b border-border/70 px-5 py-5">
          <div>
            <p className="text-muted-foreground text-[11px] tracking-[0.2em] uppercase">
              Your selection
            </p>
            <h2 className="mt-1 text-lg" id={id ? `${id}-title` : undefined}>
              Cart
            </h2>
          </div>
          <button
            className="hover:bg-muted rounded-full p-2 transition"
            onClick={onClose}
            type="button"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        <div className="min-h-[240px] flex-1 space-y-4 overflow-y-auto px-5 py-5">
          {state.items.length === 0 && (
            <div className="rounded-[1.75rem] border border-dashed border-border px-5 py-8 text-center">
              <p className="text-base">Your cart is empty</p>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                Add a few pieces from the collection to see them here.
              </p>
            </div>
          )}

          {state.items.map((item) => (
            <div
              key={item.id}
              className="animate-in fade-in-0 slide-in-from-bottom-1 flex items-start gap-3 rounded-[1.5rem] border border-border/70 bg-card/90 p-4 duration-200 shadow-sm"
            >
              <div className="flex min-w-0 flex-1 gap-3">
                <div className="bg-secondary/55 relative size-18 shrink-0 overflow-hidden rounded-[1.25rem]">
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
                        className="object-contain p-2"
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
                  <p className="text-muted-foreground mt-1 text-sm">
                    {item.quantity} × {formatPrice(item.price)}
                  </p>
                  <div className="mt-3 inline-flex items-center rounded-full border border-border/70 bg-background/90">
                    <button
                      aria-label={`Decrease ${item.title} quantity`}
                      className="hover:bg-muted rounded-full px-3 py-1.5 text-sm transition"
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
                      className="hover:bg-muted rounded-full px-3 py-1.5 text-sm transition"
                      onClick={() => increaseItem(item.id)}
                      type="button"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button
                className="text-muted-foreground hover:bg-muted hover:text-foreground shrink-0 rounded-full px-3 py-1.5 text-sm transition"
                onClick={() => removeItem(item.id)}
                type="button"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="border-t border-border/70 bg-card/70 px-5 py-5">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-muted-foreground text-[11px] tracking-[0.2em] uppercase">
                Estimated total
              </p>
              <p className="mt-1 text-2xl font-medium tabular-nums">
                {formatPrice(total)}
              </p>
            </div>
            <p className="text-muted-foreground max-w-40 text-right text-xs leading-5">
              Taxes and delivery are omitted in this demo flow.
            </p>
          </div>

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
