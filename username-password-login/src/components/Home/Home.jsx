import React from "react";

import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import AuthContext from "../context/AuthContextProvider";
import classes from "./Home.module.css";

const Home = (props) => {
  const ctx = React.useContext(AuthContext);
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={ctx.onLogout}>LogOut</Button>
    </Card>
  );
};

export default Home;
