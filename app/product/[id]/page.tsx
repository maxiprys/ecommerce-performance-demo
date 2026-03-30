import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";
import { API } from "@/services/fakeStoreApi";
import AddToCartButton from "@/features/products/components/AddToCartButton";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const product = await API.getProductById(id);

  if (!product) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 mb-4"
        >
          <ArrowLeft />
          Back to collection
        </Link>
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 mb-4"
      >
        <ArrowLeft size={16} />
        Back to collection
      </Link>

      <div className="relative w-full h-120">
        {product.image && (
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="100vw"
            className="object-contain rounded-md"
          />
        )}
      </div>

      <h1 className="text-3xl font-bold mt-4">{product.title}</h1>
      <p className="text-gray-600 mt-2">{formatPrice(product.price)}</p>
      <p className="mt-4">{product.description}</p>

      <AddToCartButton className="mt-3" product={product} />
    </div>
  );
}
