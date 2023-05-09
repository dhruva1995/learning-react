import React from "react";
import bgImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
const Header: React.FC<{
  onShowCart: () => void;
}> = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={bgImage} alt="Table of delicious food" />
      </div>
    </>
  );
};

export default Header;
