import Card from "../UI/Card";
import { UserData } from "../models/models";
import styles from "./UsersList.module.css";

const UsersList: React.FC<{ users: UserData[] }> = (props) => {
  const content = props.users.map((user) => (
    <li key={user.id}>
      {user.userName} is {user.age} years old
    </li>
  ));
  return (
    <Card className={styles.users}>
      <ul>{content}</ul>
    </Card>
  );
};

export default UsersList;
