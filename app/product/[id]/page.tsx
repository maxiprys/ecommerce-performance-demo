import { products } from "@/features/products/data";
import Image from "next/image";
import { formatPrice } from "@/lib/formatPrice";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return <div className="p-6">Product not found</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="relative w-full h-80">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="100vw"
          className="object-cover rounded-md"
        />
      </div>

      <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
      <p className="text-gray-600 mt-2">{formatPrice(product.price)}</p>
      <p className="mt-4">{product.description}</p>
    </div>
  );
}
