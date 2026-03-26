"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/formatPrice";
import React from "react";

type Props = {
  product: Product;
};

function ProductCard({ product }: Props) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="border rounded-xl p-4 hover:shadow-lg transition cursor-pointer">
        <div className="relative w-full h-48">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover rounded-md"
          />
        </div>

        <h2 className="mt-3 font-semibold">{product.name}</h2>
        <p className="text-gray-600">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}

export default React.memo(ProductCard);