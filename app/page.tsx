import { Suspense } from "react";
import CollectionSubtitle from "@/components/CollectionSubtitle";
import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">The Collection</h1>
      <CollectionSubtitle />

      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="h-86 bg-gray-200 animate-pulse rounded-xl"
              />
            ))}
          </div>
        }
      >
        <ProductGrid />
      </Suspense>
    </div>
  );
}
