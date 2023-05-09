import React from "react";
import CartContext, { CartContextType } from "../../context/CartContext";
import CartItem from "../../models/CartItem";
import classes from "./CartItemComponent.module.css";

type CartItemComponentPropsType = {
  item: CartItem;
};

const CartItemComponent: React.FC<CartItemComponentPropsType> = (
  props: CartItemComponentPropsType
) => {
  const price = `$${props.item.price.toFixed(2)}`;
  const cartContext = React.useContext<CartContextType>(CartContext);
  const handleAddItem = () => {
    cartContext.addItem({ ...props.item, amount: 1 });
  };
  const handleRemoveItem = () => {
    cartContext.removeItem(props.item.id);
  };
  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.item.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.item.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={handleRemoveItem}>−</button>
        <button onClick={handleAddItem}>+</button>
      </div>
    </li>
  );
};

export default CartItemComponent;
