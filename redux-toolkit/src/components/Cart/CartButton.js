import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../stores/ui-slice";
import classes from "./CartButton.module.css";

const CartButton = (props) => {
  const quantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const toggleCartHandler = () => {
    dispatch(uiActions.toggleCartVisibility());
  };
  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{quantity}</span>
    </button>
  );
};

export default CartButton;
