"use client";

import { useCart } from "@/features/cart/CartContext";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Props = {
  className: string;
  product: Product;
};

export default function AddToCartButton(props: Props) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    addItem({
      id: props.product.id,
      title: props.product.title,
      price: props.product.price,
      quantity: 1,
    });
  };

  return (
    <Button
      aria-label="Submit"
      className={
        props.className + " min-w-[110px] bg-red-400 text-white cursor-pointer"
      }
      onClick={handleAddToCart}
      variant="outline"
    >
      Add to cart
      <Plus />
    </Button>
  );
}
