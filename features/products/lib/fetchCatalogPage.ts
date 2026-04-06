import type { Product } from "@/types/product";
import { CATALOG_PAGE_SIZE } from "@/lib/catalog";

export async function fetchCatalogPage(args: {
  offset: number;
  title?: string;
  limit?: number;
}): Promise<Product[]> {
  const params = new URLSearchParams({
    offset: String(args.offset),
    limit: String(args.limit ?? CATALOG_PAGE_SIZE),
  });
  const t = args.title?.trim();
  if (t) params.set("title", t);

  const res = await fetch(`/api/products?${params.toString()}`);
  if (!res.ok) throw new Error("Could not load products");
  return res.json() as Promise<Product[]>;
}
