"use client";

import { useId } from "react";
import { Search, SearchX } from "lucide-react";
import ProductCard from "@/features/products/components/ProductCard";
import { useProductCatalog } from "@/features/products/hooks/useProductCatalog";
import type { Product } from "@/types/product";
import { Button } from "@/components/ui/button";

type Props = {
  initialProducts: Product[];
  initialQuery: string;
};

export default function ProductCatalog({
  initialProducts,
  initialQuery,
}: Props) {
  const searchId = useId();
  const statusId = useId();

  const {
    products,
    inputValue,
    setInputValue,
    error,
    statusMessage,
    hasMore,
    loadMore,
    isSearchPending,
    loadingMore,
    attachSentinel,
  } = useProductCatalog({ initialProducts, initialQuery });

  const loadBusy = isSearchPending || loadingMore;

  return (
    <div className="mt-8 space-y-6">
      <div className="relative max-w-xl">
        <label className="sr-only" htmlFor={searchId}>
          Search products
        </label>
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <input
          className="border-input bg-background focus-visible:ring-ring h-11 w-full rounded-xl border pl-10 pr-3 text-sm shadow-sm outline-none transition focus-visible:ring-2"
          id={searchId}
          name="q"
          placeholder="Search by title…"
          type="search"
          autoComplete="off"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          aria-controls={statusId}
        />
      </div>

      <p className="text-muted-foreground text-sm" id={statusId} role="status">
        {statusMessage}
      </p>

      {error && (
        <p className="text-destructive text-sm" role="alert">
          {error}
        </p>
      )}

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <li
            key={product.id}
            className="[content-visibility:auto] [contain-intrinsic-size:auto_320px]"
          >
            <ProductCard product={product} />
          </li>
        ))}
      </ul>

      {!error && !isSearchPending && products.length === 0 && (
        <div className="bg-muted/30 rounded-2xl border px-6 py-10 text-center">
          <SearchX
            className="mx-auto mb-3 size-9 text-zinc-400 dark:text-zinc-500"
            aria-hidden
          />
          <h3 className="text-base font-semibold">No products found</h3>
          <p className="text-muted-foreground mx-auto mt-1 max-w-md text-sm">
            Try a different search term or clear the current filter to explore
            the full catalog.
          </p>
          {inputValue.trim().length > 0 && (
            <Button
              className="mt-5"
              onClick={() => setInputValue("")}
              type="button"
              variant="outline"
            >
              Clear search
            </Button>
          )}
        </div>
      )}

      {hasMore && products.length > 0 && (
        <div className="flex justify-center pt-4">
          <Button
            disabled={loadBusy}
            onClick={() => void loadMore()}
            type="button"
            variant="outline"
          >
            {loadingMore ? "Loading…" : "Load more"}
          </Button>
        </div>
      )}

      <div ref={attachSentinel} className="h-px w-full" aria-hidden />
    </div>
  );
}
