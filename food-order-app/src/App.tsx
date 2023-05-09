import React from "react";
import "./App.css";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartContextProvider from "./context/CartContextProvider";

function App() {
  const [showCart, setShowCart] = React.useState(false);

  const displayCartModal = () => {
    setShowCart(true);
  };
  const hideCartModal = () => {
    setShowCart(false);
  };

  return (
    <CartContextProvider>
      {showCart && <Cart onHideCart={hideCartModal}></Cart>}
      <Header onShowCart={displayCartModal}></Header>
      <main>
        <Meals></Meals>
      </main>
    </CartContextProvider>
  );
}

export default App;
