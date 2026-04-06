"use client";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6">
        <CheckCircle2
          className="text-primary mx-auto mb-4 size-14"
          aria-hidden
        />
        <h1 className="text-2xl font-semibold tracking-tight">
          Order received
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          This is a demo — no payment was processed. Thanks for trying the
          flow.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">Back to shop</Link>
        </Button>
      </div>
    );
  }

  if (state.items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6">
        <h1 className="text-2xl font-semibold tracking-tight">Checkout</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Your cart is empty. Add something from the collection first.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">Browse products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Link
        className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 text-sm"
        href="/"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Back to shop
      </Link>

      <h1 className="text-3xl font-semibold tracking-tight">Checkout</h1>
      <p className="text-muted-foreground mt-1 text-sm">
        Demo checkout — fill the form to complete a mock order.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-5">
        <form
          className="space-y-5 lg:col-span-3"
          noValidate
          onSubmit={handleSubmit}
        >
          <fieldset className="space-y-4">
            <legend className="mb-2 text-sm font-medium">Contact</legend>
            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="fullName">
                Full name
              </label>
              <input
                autoComplete="name"
                className="border-input bg-background focus-visible:ring-ring h-10 w-full rounded-lg border px-3 text-sm outline-none focus-visible:ring-2"
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
                className="border-input bg-background focus-visible:ring-ring h-10 w-full rounded-lg border px-3 text-sm outline-none focus-visible:ring-2"
                id="email"
                name="email"
                required
                type="email"
              />
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="mb-2 text-sm font-medium">Shipping</legend>
            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="address">
                Address
              </label>
              <input
                autoComplete="street-address"
                className="border-input bg-background focus-visible:ring-ring h-10 w-full rounded-lg border px-3 text-sm outline-none focus-visible:ring-2"
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
                  className="border-input bg-background focus-visible:ring-ring h-10 w-full rounded-lg border px-3 text-sm outline-none focus-visible:ring-2"
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
                  className="border-input bg-background focus-visible:ring-ring h-10 w-full rounded-lg border px-3 text-sm outline-none focus-visible:ring-2"
                  id="postal"
                  name="postal"
                  required
                  type="text"
                />
              </div>
            </div>
          </fieldset>

          <Button className="w-full sm:w-auto" type="submit">
            Place order
          </Button>
        </form>

        <aside
          aria-labelledby="order-summary-heading"
          className="bg-muted/40 h-fit rounded-xl border p-5 lg:col-span-2"
        >
          <h2 className="font-semibold" id="order-summary-heading">
            Order summary
          </h2>
          <ul className="mt-4 space-y-4">
            {state.items.map((item) => (
              <li key={item.id} className="flex gap-3 text-sm">
                <div className="bg-muted relative size-14 shrink-0 overflow-hidden rounded-md">
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
            Total {formatPrice(total)}
          </p>
        </aside>
      </div>
    </div>
  );
}
