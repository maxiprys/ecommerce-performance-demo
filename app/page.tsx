import CollectionSubtitle from "@/components/CollectionSubtitle";
import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">The Collection</h1>
      <CollectionSubtitle />

      <ProductGrid />
    </div>
  );
}
