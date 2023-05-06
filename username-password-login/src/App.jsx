import React from "react";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./components/context/AuthContextProvider";

function App() {
  const cxt = React.useContext(AuthContext);
  return (
    <>
      <MainHeader />
      <main>
        {!cxt.isLoggedIn && <Login />}
        {cxt.isLoggedIn && <Home />}
      </main>
    </>
  );
}

export default App;
