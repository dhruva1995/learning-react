import ReactDOM from "react-dom";
import Button from "./Button";
import Card from "./Card";
import styles from "./ErrorModal.module.css";
const ErrorModal: React.FC<{
  title: string;
  message: string;
  onCancel: () => void;
}> = (props) => {
  const BackDrop: React.FC<{ onCancel: () => void }> = (props) => {
    return <div className={styles.backdrop} onClick={props.onCancel}></div>;
  };

  const Modal: React.FC<{
    title: string;
    message: string;
    onCancel: () => void;
  }> = (props) => {
    return (
      <Card className={styles.modal}>
        <header className={styles.header}>
          <h2>{props.title}</h2>
        </header>
        <p className={styles.content}>{props.message}</p>
        <footer className={styles.actions}>
          <Button onClick={props.onCancel}>Okay</Button>
        </footer>
      </Card>
    );
  };
  const backDropRoot = document.getElementById("backdrop-root");
  const overlayRoot = document.getElementById("overlay-root");
  return (
    <>
      {backDropRoot &&
        ReactDOM.createPortal(
          <BackDrop onCancel={props.onCancel} />,
          backDropRoot
        )}
      {overlayRoot &&
        ReactDOM.createPortal(
          <Modal
            title={props.title}
            message={props.message}
            onCancel={props.onCancel}
          />,
          overlayRoot
        )}
    </>
  );
};

export default ErrorModal;
