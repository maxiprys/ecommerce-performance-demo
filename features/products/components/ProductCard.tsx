"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/formatPrice";
import { useCart } from "@/features/cart/CartContext";

type Props = {
  product: Product;
};

function ProductCard({ product }: Props) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
    });
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="border rounded-xl p-4 hover:shadow-lg transition cursor-pointer">
        <div className="relative w-full h-48">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover rounded-md"
          />
        </div>

        <h2 className="mt-3 font-semibold">{product.title}</h2>
        <p className="text-gray-600">{formatPrice(product.price)}</p>

        <button
          onClick={handleAddToCart}
          className="mt-3 bg-black text-white px-3 py-1 rounded cursor-pointer"
        >
          Add to cart
        </button>
      </div>
    </Link>
  );
}

export default React.memo(ProductCard);
