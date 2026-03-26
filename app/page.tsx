import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <ProductGrid />
    </div>
  );
}
