import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";
import { API } from "@/services/api";
import AddToCartButton from "@/features/products/components/AddToCartButton";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const product = await API.getProductById(id);

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Link
          className="text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1 text-sm"
          href="/"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back to collection
        </Link>

        <p>Product not found</p>
      </div>
    );
  }

  const image = product.images[0] || "/images/placeholder.svg";

  return (
    <div className="px-4 py-8 sm:px-6 sm:py-10">
      <Link
        className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-1.5 text-sm"
        href="/"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Back to collection
      </Link>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-start">
        <div className="from-secondary/75 to-background relative aspect-square overflow-hidden rounded-[2rem] border border-border/70 bg-linear-to-b shadow-sm sm:aspect-[4/4.6]">
          <div className="absolute left-5 top-5 z-10 rounded-full border border-border/70 bg-background/90 px-3 py-1 text-[11px] tracking-[0.18em] uppercase">
            {product.category?.name ?? "Studio selection"}
          </div>
          <Image
            alt={product.title}
            className="object-contain p-8 sm:p-10"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            src={image}
          />
        </div>

        <div className="space-y-6">
          <div className="space-y-4 rounded-[2rem] border border-border/70 bg-card/90 p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap gap-2">
              <span className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-[11px] tracking-[0.18em] uppercase">
                New arrival
              </span>
              <span className="text-muted-foreground rounded-full border border-border/70 px-3 py-1 text-[11px] tracking-[0.18em] uppercase">
                Thoughtful finish
              </span>
            </div>
            <div className="space-y-3">
              <h1 className="text-3xl leading-tight sm:text-4xl">
                {product.title}
              </h1>
              <p className="text-muted-foreground text-base leading-7">
                {product.description}
              </p>
            </div>
            <div className="flex items-end justify-between gap-4 border-y border-border/70 py-5">
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-[0.18em]">
                  Price
                </p>
                <p className="text-3xl font-medium tabular-nums">
                  {formatPrice(product.price)}
                </p>
              </div>
              <p className="text-muted-foreground max-w-48 text-right text-sm leading-6">
                Shipping cues and checkout feedback remain lightweight for a
                faster experience.
              </p>
            </div>
            <AddToCartButton className="w-full sm:w-auto" product={product} />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.5rem] border border-border/70 bg-background/85 p-4 shadow-sm">
              <p className="text-muted-foreground text-[11px] tracking-[0.2em] uppercase">
                Material feel
              </p>
              <p className="mt-2 text-sm leading-6">
                Elevated surfaces and quiet tones keep the product in focus.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-border/70 bg-background/85 p-4 shadow-sm">
              <p className="text-muted-foreground text-[11px] tracking-[0.2em] uppercase">
                Fast loading
              </p>
              <p className="mt-2 text-sm leading-6">
                Images and navigation stay optimized to preserve responsiveness.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-border/70 bg-background/85 p-4 shadow-sm">
              <p className="text-muted-foreground text-[11px] tracking-[0.2em] uppercase">
                Studio note
              </p>
              <p className="mt-2 text-sm leading-6">
                A simple purchase path with enough detail to feel intentional.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
