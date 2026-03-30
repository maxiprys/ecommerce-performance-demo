import ProductCard from "@/features/products/components/ProductCard";
import { API } from "@/services/fakeStoreApi";
import ProductsQuantityUpdater from "../features/products/ProductsQuantityUpdater";

export default async function ProductGrid() {
  const products = await API.getAllProducts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
      {/* Updates the ProductsContext on the client */}
      <ProductsQuantityUpdater total={products.length} />

      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
