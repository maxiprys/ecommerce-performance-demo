import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/features/products/components/ProductCard";

export default function ProductGrid() {
  const products = useProducts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}