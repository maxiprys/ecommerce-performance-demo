"use client";

import { useCart } from "@/features/cart/CartContext";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Props = {
  className?: string;
  product: Product;
};

export default function AddToCartButton({ className, product }: Props) {
  const { addItem, state } = useCart();
  const quantityInCart =
    state.items.find((item) => item.id === product.id)?.quantity ?? 0;
  const isAdded = quantityInCart > 0;

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.images[0],
    });
  };

  return (
    <Button
      aria-label={
        isAdded
          ? `${product.title} in cart: ${quantityInCart}`
          : `Add ${product.title} to cart`
      }
      className={`${!isAdded ? "bg-emerald-600 text-white hover:bg-emerald-700" : ""} ${className ?? ""} cursor-pointer`.trim()}
      onClick={handleAddToCart}
      type="button"
    >
      {isAdded ? `In cart: ${quantityInCart}` : "Add to cart"}
      <Plus aria-hidden className="size-4" />
    </Button>
  );
}
