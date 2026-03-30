import { Product } from "@/types/product";

const BASE_URL = "https://fakestoreapi.com/products";

async function getAllProducts(): Promise<Product[]> {
  try {
    const res = await fetch(BASE_URL);

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

    debugger;

    if (!res.ok) throw new Error(`Producto con id ${id} no encontrado`);

    const data: Product = await res.json();

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const API = {
  getAllProducts,
  getProductById,
};
