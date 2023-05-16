import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Notification from "./components/Layout/Notification";
import Products from "./components/Shop/Products";
import { fetchCartData, syncCartToBackend } from "./stores/cart-actions";

let isInital = true;

function App() {
  const cartState = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isInital) {
      isInital = false;
      return;
    }
    if (cartState.cartChanged) dispatch(syncCartToBackend(cartState));
  }, [cartState, dispatch]);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);
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
