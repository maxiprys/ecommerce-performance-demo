"use client";

import { useContext } from "react";
import { ProductsContext } from "@/features/products/ProductsContext";

export default function CollectionSubtitle() {
  const products = useContext(ProductsContext);
  const loaded = products?.state.quantity ?? 0;

  return (
    <p className="text-muted-foreground text-sm">
      {loaded > 0
        ? `${loaded} product${loaded === 1 ? "" : "s"} in view (load more as you scroll)`
        : "Preparing the shelf…"}
    </p>
  );
}
