import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemFreq: {},
    totalQuantity: 0,
  },
  reducers: {
    addItemToCart(prevState, action) {
      prevState.totalQuantity++;
      const item = action.payload;
      if (item.id in prevState.itemFreq) {
        prevState.itemFreq[item.id].quantity++;
        prevState.itemFreq[item.id].totalPrice += item.price;
      } else {
        prevState.itemFreq[item.id] = {
          id: item.id,
          price: item.price,
          quantity: 1,
          totalPrice: item.price,
          name: item.name,
        };
      }
    },
    removeItemFromCart(prevState, action) {
      prevState.totalQuantity--;
      const itemId = action.payload;
      const item = prevState.itemFreq[itemId];
      if (item.quantity === 1) {
        delete prevState.itemFreq[itemId];
      } else {
        item.quantity--;
        item.totalPrice -= item.price;
      }
    },
  },
});

export default cartSlice;
export const cartActions = cartSlice.actions;
