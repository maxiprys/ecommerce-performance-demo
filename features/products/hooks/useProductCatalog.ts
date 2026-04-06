"use client";

import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";
import { ProductsContext } from "@/features/products/ProductsContext";
import { fetchCatalogPage } from "@/features/products/lib/fetchCatalogPage";
import type { Product } from "@/types/product";
import { CATALOG_PAGE_SIZE } from "@/lib/catalog";

type Args = {
  initialProducts: Product[];
  initialQuery: string;
};

function hasAnotherPage(page: Product[]) {
  return page.length === CATALOG_PAGE_SIZE;
}

export function useProductCatalog({ initialProducts, initialQuery }: Args) {
  const productsCtx = useContext(ProductsContext);
  const router = useRouter();

  const [products, setProducts] = useState(initialProducts);
  const [query, setQuery] = useState(initialQuery.trim());
  const [inputValue, setInputValue] = useState(initialQuery);
  const [hasMore, setHasMore] = useState(hasAnotherPage(initialProducts));
  const [error, setError] = useState<string | null>(null);
  const [isSearchPending, startSearchTransition] = useTransition();
  const [loadingMore, setLoadingMore] = useState(false);
  const [sentinelNode, setSentinelNode] = useState<HTMLDivElement | null>(null);

  const loadingMoreLock = useRef(false);
  const skipDebouncedSearchOnce = useRef(true);

  const productsLen = products.length;
  const snapshot = useRef({ products, query, hasMore });
  snapshot.current = { products, query, hasMore };

  const updateProductsQuantity = productsCtx?.updateProductsQuantity;
  useEffect(() => {
    updateProductsQuantity?.(productsLen);
  }, [updateProductsQuantity, productsLen]);

  useEffect(() => {
    setProducts(initialProducts);
    setInputValue(initialQuery);
    setQuery(initialQuery.trim());
    setHasMore(hasAnotherPage(initialProducts));
    setError(null);
    skipDebouncedSearchOnce.current = true;
  }, [initialProducts, initialQuery]);

  const runSearch = useCallback(
    async (q: string) => {
      setQuery(q);
      router.replace(q ? `/?q=${encodeURIComponent(q)}` : "/", {
        scroll: false,
      });
      const data = await fetchCatalogPage({ offset: 0, title: q });
      setProducts(data);
      setHasMore(hasAnotherPage(data));
    },
    [router]
  );

  const appendNextPage = useCallback(async () => {
    const { products: list, query: q, hasMore: more } = snapshot.current;
    if (!more || loadingMoreLock.current) return;
    loadingMoreLock.current = true;
    setLoadingMore(true);
    setError(null);
    try {
      const data = await fetchCatalogPage({ offset: list.length, title: q });
      setProducts((prev) => [...prev, ...data]);
      setHasMore(hasAnotherPage(data));
    } catch {
      setError("Could not load products. Try again.");
    } finally {
      loadingMoreLock.current = false;
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => {
      if (skipDebouncedSearchOnce.current) {
        skipDebouncedSearchOnce.current = false;
        if (inputValue.trim() === initialQuery.trim()) return;
      }

      startSearchTransition(() => {
        void (async () => {
          setError(null);
          try {
            await runSearch(inputValue.trim());
          } catch {
            setError("Could not load products. Try again.");
          }
        })();
      });
    }, 400);

    return () => window.clearTimeout(t);
  }, [inputValue, initialQuery, runSearch]);

  useEffect(() => {
    if (!sentinelNode) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting || isSearchPending) return;
        void appendNextPage();
      },
      { rootMargin: "320px" }
    );

    observer.observe(sentinelNode);
    return () => observer.disconnect();
  }, [appendNextPage, isSearchPending, sentinelNode]);

  const statusMessage = isSearchPending
    ? "Searching…"
    : products.length > 0
      ? `${products.length} product${products.length === 1 ? "" : "s"} loaded${hasMore ? " — scroll for more" : ""}`
      : query
        ? "No matches for your search."
        : "No products to show.";

  const attachSentinel = useCallback((node: HTMLDivElement | null) => {
    setSentinelNode(node);
  }, []);

  return {
    products,
    inputValue,
    setInputValue,
    error,
    statusMessage,
    hasMore,
    loadMore: appendNextPage,
    isSearchPending,
    loadingMore,
    attachSentinel,
  };
}
