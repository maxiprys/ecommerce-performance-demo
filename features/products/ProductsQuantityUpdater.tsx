"use client";

import { useContext, useEffect, useRef } from "react";
import { ProductsContext } from "@/features/products/ProductsContext";

export default function ProductsQuantityUpdater({
  total,
}: {
  total: number;
}) {
  const products = useContext(ProductsContext);
  const lastTotalRef = useRef<number | null>(null);

  useEffect(() => {
    // Avoid infinite loops: context value (and updater identity) can change per render.
    // We only trigger an update when the numeric total actually changes.
    if (lastTotalRef.current === total) return;
    lastTotalRef.current = total;

    products?.updateProductsQuantity(total);
  }, [products, total]);

  return null;
}

