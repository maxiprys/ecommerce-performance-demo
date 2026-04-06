"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import type { CartLineItem } from "@/types/cart";

type State = {
  items: CartLineItem[];
};

type Action =
  | { type: "ADD_ITEM"; payload: CartLineItem }
  | { type: "REMOVE_ITEM"; payload: number };

const CartContext = createContext<{
  state: State;
  addItem: (item: CartLineItem) => void;
  removeItem: (id: number) => void;
} | null>(null);

const initialState: State = {
  items: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  quantity: item.quantity + action.payload.quantity,
                }
              : item
          ),
        };
      }

      return {
        items: [...state.items, action.payload],
      };
    }

    case "REMOVE_ITEM":
      return {
        items: state.items.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addItem = (item: CartLineItem) =>
    dispatch({ type: "ADD_ITEM", payload: item });

  const removeItem = (id: number) =>
    dispatch({ type: "REMOVE_ITEM", payload: id });

  return (
    <CartContext.Provider value={{ state, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
