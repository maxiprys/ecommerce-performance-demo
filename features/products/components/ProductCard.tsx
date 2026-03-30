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
  return (
    <div className="hover:shadow-lg transition overflow-auto">
      <Link href={`/product/${product.id}`}>
        <div className="relative w-full h-70 rounded-xl bg-white cursor-pointer">
          {product.image && (
            <Image
              alt={product.title}
              className="object-contain"
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              src={product.image}
            />
          )}
        </div>
      </Link>

      <section className="flex items-start mt-3 gap-3 justify-between">
        <section>
          <h2 className="font-semibold">{product.title}</h2>

          <p className="text-gray-400">{formatPrice(product.price)}</p>
        </section>
      </section>
    </div>
  );
}

export default React.memo(ProductCard);
