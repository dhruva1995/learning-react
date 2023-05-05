import React from "react";
import "./App.css";
import AddUser from "./components/User/AddUser";
import UsersList from "./components/User/UsersList";
import { UserData, UserInput } from "./components/models/models";

function App() {
  const [users, setUsers] = React.useState<UserData[]>([]);

  const addUserHandler = (newUser: UserInput) => {
    setUsers((prev) => [{ ...newUser, id: new Date().getTime() }, ...prev]);
  };

  return (
    <>
      <AddUser onAddUser={addUserHandler}></AddUser>
      <UsersList users={users}></UsersList>
    </>
  );
}

export default App;
