import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const syncCartToBackend = (cartState) => {
  return async (dispatch) => {
    dispatch(
      uiActions.setNotification({
        status: "pending",
        message: "Sent request to sync your cart to backend.",
        title: "Syncing...",
      })
    );
    try {
      const response = await fetch(
        "https://react-http-5845d-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            itemFreq: cartState.itemFreq,
            totalQuantity: cartState.totalQuantity,
          }),
        }
      );
      if (response.ok) {
        dispatch(
          uiActions.setNotification({
            status: "success",
            message: "Cart synced successfully",
            title: "Success !",
          })
        );
      } else {
        throw new Error(
          "Error couldn't sync cart due to " + response.statusText
        );
      }
    } catch (err) {
      dispatch(
        uiActions.setNotification({
          status: "error",
          title: "Failed X",
          message: "Failed to sync cart to backend",
        })
      );
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    try {
      dispatch(
        uiActions.setNotification({
          status: "pending",
          message: "Sent request to fetch items to cart.",
          title: "Syncing...",
        })
      );
      const response = await fetch(
        "https://react-http-5845d-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json"
      );
      if (response.ok) {
        const data = await response.json();
        dispatch(
          cartActions.initializeCartFromBackend({
            itemFreq: data.itemFreq || {},
            totalQuantity: data.totalQuantity || 0,
          })
        );
        dispatch(
          uiActions.setNotification({
            status: "success",
            message: "Cart fetched successfully",
            title: "Success !",
          })
        );
      }
    } catch (err) {
      dispatch(
        uiActions.setNotification({
          status: "error",
          title: "Failed X",
          message: "Failed to fetch cart from backend",
        })
      );
    }
  };
};
