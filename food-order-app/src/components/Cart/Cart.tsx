import React from "react";
import CartContext, { CartContextType } from "../../context/CartContext";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItemComponent from "./CartItemComponent";

const Cart: React.FC<{ onHideCart: () => void }> = (props) => {
  const cartContext = React.useContext<CartContextType>(CartContext);

  const cartItems = cartContext.items.map((item) => (
    <CartItemComponent item={item} key={item.id} />
  ));
  const orderHandler = () => {
    console.log("Order placed for ", JSON.stringify(cartContext.items));
  };
  return (
    <Modal onClose={props.onHideCart}>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${cartContext.totalAmount.toFixed(2)}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      </div>
    </Modal>
  );
};

export default Cart;
