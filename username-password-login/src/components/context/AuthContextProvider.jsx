import React from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogin: (_userName, _password) => {},
  onLogout: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const context = {
    isLoggedIn: isLoggedIn,
    onLogin: () => {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
    },
    onLogout: () => {
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
    },
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
