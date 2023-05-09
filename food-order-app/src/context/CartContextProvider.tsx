import React from "react";
import CartItem from "../models/CartItem";
import CartContext from "./CartContext";

type CartContextState = {
  items: CartItem[];
  totalAmount: number;
};

enum EventType {
  "ADD",
  "REMOVE",
}

interface CartItemEvent {
  type: EventType;
}

interface AddEvent extends CartItemEvent {
  item: CartItem;
  type: EventType.ADD;
}

interface RemoveEvent extends CartItemEvent {
  id: string;
  type: EventType.REMOVE;
}

const DEFAULT_CART_CONTEXT_STATE = { items: [], totalAmount: 0 };
const CartStateReducer = (
  prevState: CartContextState,
  event: CartItemEvent
): CartContextState => {
  if (event.type === EventType.ADD) {
    const addEvent = event as AddEvent;
    let newItems = prevState.items;
    const newTotalAmount =
      prevState.totalAmount + addEvent.item.amount * addEvent.item.price;
    const prevCartItemIndex = newItems.findIndex(
      (item) => item.id === addEvent.item.id
    );
    if (prevCartItemIndex !== -1) {
      const prevItem = newItems[prevCartItemIndex];
      const updatedItem = { ...prevItem };
      newItems = [...newItems];
      updatedItem.amount += addEvent.item.amount;
      newItems[prevCartItemIndex] = updatedItem;
    } else {
      newItems = newItems.concat([addEvent.item]);
    }
    return { totalAmount: newTotalAmount, items: newItems };
  } else if (event.type === EventType.REMOVE) {
    const removeEvent = event as RemoveEvent;
    const prevCartItemIndex = prevState.items.findIndex(
      (item) => item.id === removeEvent.id
    );
    const prevCartItem = prevState.items[prevCartItemIndex];
    const newTotalAmount = prevState.totalAmount - prevCartItem!.price;
    let items = [...prevState.items];

    if (prevCartItem!.amount == 1) {
      items = items.filter((item) => item.id !== removeEvent.id);
    } else {
      items[prevCartItemIndex] = {
        ...prevCartItem,
        amount: prevCartItem.amount - 1,
      };
    }
    return { totalAmount: newTotalAmount, items: items };
  }
  return DEFAULT_CART_CONTEXT_STATE;
};

const CartContextProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [state, cartContextDispatcher] = React.useReducer(
    CartStateReducer,
    DEFAULT_CART_CONTEXT_STATE
  );
  const addItemToCart = (item: CartItem) => {
    cartContextDispatcher({ type: EventType.ADD, item: item } as AddEvent);
  };
  const removeItemFromCart = (id: string) => {
    cartContextDispatcher({ type: EventType.REMOVE, id: id } as RemoveEvent);
  };
  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalAmount: state.totalAmount,
        addItem: addItemToCart,
        removeItem: removeItemFromCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
