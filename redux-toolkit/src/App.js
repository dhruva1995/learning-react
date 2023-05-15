import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Notification from "./components/Layout/Notification";
import Products from "./components/Shop/Products";
import { uiActions } from "./stores/ui-slice";

let isInital = true;

function App() {
  const cartState = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    const syncToBackend = async () => {
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
            body: JSON.stringify(cartState),
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
    if (isInital) {
      isInital = false;
      return;
    }
    syncToBackend();
  }, [cartState, dispatch]);
  const notification = useSelector((state) => state.ui.notification);
  const showCart = useSelector((state) => state.ui.isCartVisible);
  return (
    <>
      {notification && <Notification {...notification} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
