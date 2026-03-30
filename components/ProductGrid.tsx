"use client";

import { useContext, useEffect, useState } from "react";
import ProductCard from "@/features/products/components/ProductCard";
import { Product } from "@/types/product";
import { API } from "../services/fakeStoreApi";
import { ProductsContext } from "@/features/products/ProductsContext";

export default function ProductGrid() {
  const productsContext = useContext(ProductsContext);
  const [products, setProducts] = useState<Product[] | null>(null);

  const fetchProducts = async () => {
    API.getAllProducts()
      .then((data) => {
        setProducts(data);
        productsContext?.updateProductsQuantity(data.length);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (!products) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-48 bg-gray-200 animate-pulse rounded" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
