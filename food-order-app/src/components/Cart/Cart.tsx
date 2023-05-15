import React from "react";
import CartContext, { CartContextType } from "../../context/CartContext";
import UserData from "../../models/UserData";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItemComponent from "./CartItemComponent";
import CheckoutForm from "./CheckoutForm";

enum CartState {
  NOT_SUBMITTED,
  SUBMITTING,
  SUBMIT_SUCCESS,
  SUBMIT_FAIL,
}

const Cart: React.FC<{ onHideCart: () => void }> = (props) => {
  const cartContext = React.useContext<CartContextType>(CartContext);
  const [showCheckout, setShowCheckout] = React.useState(false);
  const [cartState, setCartState] = React.useState(CartState.NOT_SUBMITTED);
  const cartItems = cartContext.items.map((item) => (
    <CartItemComponent item={item} key={item.id} />
  ));
  const orderHandler = () => {
    setShowCheckout(true);
    console.log("Order placed for ", JSON.stringify(cartContext.items));
  };
  const modalAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHideCart}>
        Close
      </button>
      <button className={classes.button} onClick={orderHandler}>
        Order
      </button>
    </div>
  );
  const confirmOrderhandler = async (userData: UserData) => {
    setCartState(CartState.SUBMITTING);
    const response = await fetch(
      "https://react-http-5845d-default-rtdb.asia-southeast1.firebasedatabase.app/order.json",
      {
        body: JSON.stringify({
          userData,
          orderItem: cartContext.items,
        }),
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseBody = await response.json();
    if (response.ok) {
      setCartState(CartState.SUBMIT_SUCCESS);
      cartContext.emptyCart();
    } else setCartState(CartState.SUBMIT_FAIL);
  };

  const cartContent = (
    <>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${cartContext.totalAmount.toFixed(2)}</span>
      </div>
      {showCheckout && (
        <CheckoutForm
          onConfirm={confirmOrderhandler}
          onClick={props.onHideCart}
        />
      )}
      {!showCheckout && modalAction}
    </>
  );

  return (
    <Modal onClose={props.onHideCart}>
      {cartState === CartState.NOT_SUBMITTED && cartContent}
      {cartState === CartState.SUBMITTING && <p>Sumbitting your order</p>}
      {cartState === CartState.SUBMIT_FAIL && (
        <p>Failed to submit your order</p>
      )}
      {cartState === CartState.SUBMIT_SUCCESS && (
        <>
          <p>Yay!, Successfully submitted your order.</p>
          <div className={classes.actions}>
            <button
              className={classes["button--alt"]}
              onClick={props.onHideCart}
            >
              Close
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default Cart;
