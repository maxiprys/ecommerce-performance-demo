"use client";

import { useCart } from "@/features/cart/CartContext";
import { Product } from "@/types/product";

type Props = {
  className: string;
  product: Product;
};

export default function CollectionSubtitle(props: Props) {
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
    <button
      onClick={handleAddToCart}
      className={
        props.className +
        " min-w-[110px] bg-red-400 text-white px-2 py-1 rounded-xl cursor-pointer"
      }
    >
      Add to cart
    </button>
  );
}
