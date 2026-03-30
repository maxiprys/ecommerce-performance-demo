"use client";

import { useContext } from "react";
import { ProductsContext } from "@/features/products/ProductsContext";

const VISIBLE_COUNT = 9;

export default function CollectionSubtitle() {
  const products = useContext(ProductsContext);
  const total = products?.state.quantity ?? 0;

  return (
    <span className="text-sm text-gray-400">
      {total > 0
        ? `Showing ${VISIBLE_COUNT} of ${total} curated pieces`
        : "Loading collection…"}
    </span>
  );
}
