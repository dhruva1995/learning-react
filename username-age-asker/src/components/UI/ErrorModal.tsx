import Button from "./Button";
import Card from "./Card";
import styles from "./ErrorModal.module.css";
const ErrorModal: React.FC<{
  title: string;
  message: string;
  onCancel: () => void;
}> = (props) => {
  return (
    <div>
      <div className={styles.backdrop} onClick={props.onCancel}></div>
      <Card className={styles.modal}>
        <header className={styles.header}>
          <h2>{props.title}</h2>
        </header>
        <p className={styles.content}>{props.message}</p>
        <footer className={styles.actions}>
          <Button onClick={props.onCancel}>Okay</Button>
        </footer>
      </Card>
    </div>
  );
};

export default ErrorModal;
