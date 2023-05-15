import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "UI",
  initialState: {
    isCartVisible: false,
    notification: null,
  },
  reducers: {
    toggleCartVisibility(prevState) {
      prevState.isCartVisible = !prevState.isCartVisible;
    },

    setNotification(prevState, action) {
      prevState.notification = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
