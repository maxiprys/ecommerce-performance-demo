"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/features/cart/CartContext";
import { formatPrice } from "@/lib/formatPrice";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function CheckoutView() {
  const { state } = useCart();
  const [submitted, setSubmitted] = useState(false);

  const total = state.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 sm:px-6">
        <div className="rounded-[2rem] border border-border/70 bg-card/90 px-6 py-10 text-center shadow-sm sm:px-10">
          <CheckCircle2
            className="text-primary mx-auto mb-4 size-14"
            aria-hidden
          />
          <h1 className="text-2xl font-semibold tracking-tight">
            Order received
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            This is a demo - no payment was processed. Thanks for trying the
            flow.
          </p>
          <Button asChild className="mt-8">
            <Link href="/">Back to shop</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (state.items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 sm:px-6">
        <div className="rounded-[2rem] border border-border/70 bg-card/90 px-6 py-10 text-center shadow-sm sm:px-10">
          <h1 className="text-2xl font-semibold tracking-tight">Checkout</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Your cart is empty. Add something from the collection first.
          </p>
          <Button asChild className="mt-8">
            <Link href="/">Browse products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 sm:px-6 sm:py-10">
      <Link
        className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 text-sm"
        href="/"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Back to shop
      </Link>

      <div className="max-w-2xl space-y-3">
        <p className="text-muted-foreground text-[11px] tracking-[0.22em] uppercase">
          Final step
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Checkout with the same calm, premium tone.
        </h1>
        <p className="text-muted-foreground text-sm leading-6 sm:text-base">
          This mock checkout keeps the interaction clean and lightweight while
          showing a more polished order review.
        </p>
      </div>

      <div className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_380px]">
        <form
          className="space-y-6 rounded-[2rem] border border-border/70 bg-card/90 p-6 shadow-sm sm:p-8"
          noValidate
          onSubmit={handleSubmit}
        >
          <fieldset className="space-y-4">
            <legend className="mb-3 text-sm font-medium tracking-[0.16em] uppercase">
              Contact
            </legend>
            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="fullName">
                Full name
              </label>
              <input
                autoComplete="name"
                className="border-input bg-background/90 focus-visible:ring-ring h-12 w-full rounded-2xl border px-4 text-sm outline-none focus-visible:ring-2"
                id="fullName"
                name="fullName"
                required
                type="text"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="email">
                Email
              </label>
              <input
                autoComplete="email"
                className="border-input bg-background/90 focus-visible:ring-ring h-12 w-full rounded-2xl border px-4 text-sm outline-none focus-visible:ring-2"
                id="email"
                name="email"
                required
                type="email"
              />
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="mb-3 text-sm font-medium tracking-[0.16em] uppercase">
              Shipping
            </legend>
            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="address">
                Address
              </label>
              <input
                autoComplete="street-address"
                className="border-input bg-background/90 focus-visible:ring-ring h-12 w-full rounded-2xl border px-4 text-sm outline-none focus-visible:ring-2"
                id="address"
                name="address"
                required
                type="text"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="city">
                  City
                </label>
                <input
                  autoComplete="address-level2"
                  className="border-input bg-background/90 focus-visible:ring-ring h-12 w-full rounded-2xl border px-4 text-sm outline-none focus-visible:ring-2"
                  id="city"
                  name="city"
                  required
                  type="text"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="postal">
                  Postal code
                </label>
                <input
                  autoComplete="postal-code"
                  className="border-input bg-background/90 focus-visible:ring-ring h-12 w-full rounded-2xl border px-4 text-sm outline-none focus-visible:ring-2"
                  id="postal"
                  name="postal"
                  required
                  type="text"
                />
              </div>
            </div>
          </fieldset>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-5">
            <p className="text-muted-foreground max-w-sm text-sm leading-6">
              No payment is processed here. This demo focuses on a polished and
              coherent storefront journey.
            </p>
            <Button className="w-full sm:w-auto" type="submit">
              Place order
            </Button>
          </div>
        </form>

        <aside
          aria-labelledby="order-summary-heading"
          className="bg-card/90 h-fit rounded-[2rem] border border-border/70 p-6 shadow-sm sm:p-8"
        >
          <p className="text-muted-foreground text-[11px] tracking-[0.22em] uppercase">
            Order summary
          </p>
          <h2 className="mt-2 font-semibold" id="order-summary-heading">
            Review your items
          </h2>
          <ul className="mt-4 space-y-4">
            {state.items.map((item) => (
              <li
                key={item.id}
                className="flex gap-3 rounded-[1.5rem] border border-border/70 bg-background/75 p-3 text-sm"
              >
                <div className="bg-secondary/55 relative size-16 shrink-0 overflow-hidden rounded-[1.1rem]">
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
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{item.title}</p>
                  <p className="text-muted-foreground">
                    {item.quantity} × {formatPrice(item.price)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t pt-4 text-base font-semibold">
            <span className="text-muted-foreground mr-2 text-xs uppercase tracking-[0.16em]">
              Total
            </span>
            {formatPrice(total)}
          </p>
        </aside>
      </div>
    </div>
  );
}
