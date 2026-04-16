"use client";

import { useContext } from "react";
import { ProductsContext } from "@/features/products/ProductsContext";

export default function CollectionSubtitle() {
  const products = useContext(ProductsContext);
  const loaded = products?.state.quantity ?? 0;

  return (
    <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
      {loaded > 0
        ? `${loaded} product${loaded === 1 ? "" : "s"} ready to browse, with more pieces loading as you move through the collection.`
        : "Preparing the collection for a smoother first look."}
    </p>
  );
}
