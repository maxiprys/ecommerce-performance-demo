import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";
import { API } from "@/services/api";
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

  const image = product?.images[0];

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <Link
          className="text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1 text-sm"
          href="/"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back to collection
        </Link>

        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <Link
        className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-1 text-sm"
        href="/"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Back to collection
      </Link>

      <div className="relative aspect-square w-full max-w-xl sm:aspect-[4/3]">
        {image ? (
          <Image
            alt={product.title}
            className="rounded-xl object-contain"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 672px"
            src={image}
          />
        ) : (
          <Image
            alt={product.title}
            className="rounded-xl object-contain"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 672px"
            src="/images/placeholder.svg"
          />
        )}
      </div>

      <h1 className="mt-6 text-3xl font-semibold tracking-tight">
        {product.title}
      </h1>
      <p className="text-muted-foreground mt-2 text-lg">
        {formatPrice(product.price)}
      </p>
      {product.category?.name && (
        <p className="text-muted-foreground mt-1 text-sm">
          {product.category.name}
        </p>
      )}
      <p className="mt-6 leading-relaxed">{product.description}</p>

      <AddToCartButton className="mt-6" product={product} />
    </div>
  );
}
