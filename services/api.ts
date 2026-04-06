import { CATALOG_PAGE_SIZE } from "@/lib/catalog";
import { Product } from "@/types/product";

const BASE_URL = "https://api.escuelajs.co/api/v1/products";

export type GetProductsParams = {
  offset?: number;
  limit?: number;
  title?: string;
};

function buildProductsUrl(params: GetProductsParams): string {
  const url = new URL(BASE_URL);
  const offset = params.offset ?? 0;
  const limit = params.limit ?? CATALOG_PAGE_SIZE;
  url.searchParams.set("offset", String(offset));
  url.searchParams.set("limit", String(limit));
  const title = params.title?.trim();
  if (title) url.searchParams.set("title", title);
  return url.toString();
}

async function getProducts(params: GetProductsParams = {}): Promise<Product[]> {
  try {
    const res = await fetch(buildProductsUrl(params));

    if (!res.ok) throw new Error("Error al obtener productos");

    const data: Product[] = await res.json();

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getProductById(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);

    if (!res.ok) throw new Error(`Producto con id ${id} no encontrado`);

    const data: Product = await res.json();

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const API = {
  getProducts,
  getProductById,
};
