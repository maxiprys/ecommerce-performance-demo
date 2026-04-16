import { CATALOG_PAGE_SIZE } from "@/lib/catalog";
import { Product } from "@/types/product";

const BASE_URL = "/api/products";

export type GetProductsParams = {
  offset?: number;
  limit?: number;
  title?: string;
};

function buildProductsUrl(params: GetProductsParams): string {
  const searchParams = new URLSearchParams();

  const offset = params.offset ?? 0;
  const limit = params.limit ?? CATALOG_PAGE_SIZE;

  searchParams.set("offset", String(offset));
  searchParams.set("limit", String(limit));

  const title = params.title?.trim();
  if (title) {
    searchParams.set("search", title);
  }

  return `${BASE_URL}?${searchParams.toString()}`;
}

function getBaseUrl() {
  if (typeof window !== "undefined") {
    return ""; // browser > relative path
  }

  // server > absolute path (production-safe)
  const configured =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL;

  if (configured) {
    if (configured.startsWith("http://") || configured.startsWith("https://")) {
      return configured;
    }

    return `https://${configured}`;
  }

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) {
    return `https://${vercelUrl}`;
  }

  return "http://localhost:3000";
}

async function getProducts(params: GetProductsParams = {}): Promise<Product[]> {
  try {
    const res = await fetch(`${getBaseUrl()}${buildProductsUrl(params)}`);

    if (!res.ok) throw new Error("Error to get products");

    const data: Product[] = await res.json();

    return data;
  } catch (error) {
    console.error("getProducts error:", error);
    return [];
  }
}

async function getProductById(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${getBaseUrl()}${BASE_URL}/${id}`);

    if (!res.ok) throw new Error(`Product with id ${id} not found`);

    const data: Product = await res.json();

    return data;
  } catch (error) {
    console.error("getProductById error:", error);
    return null;
  }
}

export const API = {
  getProducts,
  getProductById,
};
