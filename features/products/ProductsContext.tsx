"use client";

import { createContext, ReactNode, useState } from "react";

type State = {
  quantity: number;
};

export const ProductsContext = createContext<{
  state: State;
  updateProductsQuantity: (quantity: number) => void;
} | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState({ quantity: 0 });

  const updateProductsQuantity = (quantity: number) =>
    setState({ quantity: quantity });

  return (
    <ProductsContext.Provider value={{ state, updateProductsQuantity }}>
      {children}
    </ProductsContext.Provider>
  );
}
