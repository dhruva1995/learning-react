import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import CartContext, { CartContextType } from "../../context/CartContext";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton: React.FC<{ onClick: () => void }> = (props) => {
  const cartContext = React.useContext<CartContextType>(CartContext);
  const [active, setActive] = React.useState(false);
  React.useEffect(() => {
    setActive(true);
    const identifier = setTimeout(() => {
      setActive(false);
    }, 300);
    return () => {
      clearTimeout(identifier);
    };
  }, [cartContext.items]);

  const totalItems = cartContext.items.reduce(
    (prev, item) => prev + item.amount,
    0
  );
  return (
    <button
      className={`${classes.button} ${active ? classes.bump : ""}`}
      onClick={props.onClick}
    >
      <span>
        <FontAwesomeIcon icon={faCartShopping} className={classes.icon} />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{totalItems}</span>
    </button>
  );
};

export default HeaderCartButton;
