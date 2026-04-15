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

  const src = image || "/images/placeholder.svg";

  return (
    <article>
      <Link
        className="focus-visible:ring-ring bg-card border-border group block overflow-hidden rounded-2xl border shadow-sm transition hover:shadow-md focus-visible:ring-2 focus-visible:outline-none"
        href={`/product/${product.id}`}
      >
        <div className="relative aspect-4/5 w-full">
          <Image
            key={src}
            alt=""
            className="object-contain p-4 transition group-hover:scale-[1.02]"
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            src={src}
            priority={product.id === 1}
          />
        </div>

        <div className="space-y-1 px-4 pb-4">
          <h2 className="line-clamp-2 font-medium leading-snug">
            {product.title}
          </h2>
          <p className="text-muted-foreground text-sm tabular-nums">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    </article>
  );
}

export default React.memo(ProductCard);
