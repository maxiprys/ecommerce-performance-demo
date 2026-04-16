"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/formatPrice";

type Props = {
  product: Product;
};

function ProductCard({ product }: Props) {
  const [image] = product.images;
  const categoryName = product.category?.name ?? "Studio selection";

  const src = image || "/images/placeholder.svg";

  return (
    <article>
      <Link
        className="focus-visible:ring-ring bg-card/95 border-border/70 group block overflow-hidden rounded-[1.75rem] border shadow-sm transition duration-300 focus-visible:ring-2 focus-visible:outline-none"
        href={`/product/${product.id}`}
      >
        <div className="from-secondary/75 to-background relative aspect-[4/4.8] w-full overflow-hidden bg-linear-to-b">
          <div className="absolute left-4 top-4 z-10 rounded-full border border-border/70 bg-background/90 px-3 py-1 text-[11px] tracking-[0.18em] uppercase">
            {categoryName}
          </div>
          <Image
            key={src}
            alt={product.title}
            className="object-contain p-6 transition duration-300 group-hover:scale-[1.04]"
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            src={src}
            priority={product.id === 1}
          />
        </div>

        <div className="space-y-4 px-5 py-5">
          <div className="space-y-2">
            <p className="text-muted-foreground text-[11px] tracking-[0.18em] uppercase">
              Ready to ship
            </p>
            <h2 className="line-clamp-2 text-lg leading-snug">
              {product.title}
            </h2>
          </div>
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-[0.16em]">
                Price
              </p>
              <p className="text-xl font-medium tabular-nums">
                {formatPrice(product.price)}
              </p>
            </div>
            <span className="text-primary text-sm font-medium transition group-hover:translate-x-0.5">
              View piece
            </span>
          </div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-6">
            {product.description}
          </p>
        </div>
      </Link>
    </article>
  );
}

export default React.memo(ProductCard);
