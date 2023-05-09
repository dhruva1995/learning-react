import React from "react";
import CartItem from "../models/CartItem";

export type CartContextType = {
  items: CartItem[];
  totalAmount: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
};

const CartContext = React.createContext<CartContextType>(getDefaultState());

export default CartContext;
function getDefaultState(): CartContextType {
  return {
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id: string) => {},
  };
}
