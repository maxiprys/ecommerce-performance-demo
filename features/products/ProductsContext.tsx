"use client";

import { createContext, ReactNode, useCallback, useMemo, useState } from "react";

type State = {
  quantity: number;
};

export const ProductsContext = createContext<{
  state: State;
  updateProductsQuantity: (quantity: number) => void;
} | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState({ quantity: 0 });

  const updateProductsQuantity = useCallback((quantity: number) => {
    setState((prev) =>
      prev.quantity === quantity ? prev : { quantity }
    );
  }, []);

  const value = useMemo(
    () => ({ state, updateProductsQuantity }),
    [state, updateProductsQuantity]
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}
