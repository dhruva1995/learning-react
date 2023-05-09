import { PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Backdrop: React.FC<{ onClick: () => void }> = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick}></div>;
};

const Overlay: React.FC<PropsWithChildren> = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal: React.FC<PropsWithChildren<{ onClose: () => void }>> = (props) => {
  const hostElement = document.getElementById("modal-area");
  return (
    <>
      {hostElement &&
        ReactDOM.createPortal(
          <Backdrop onClick={props.onClose} />,
          hostElement
        )}
      {hostElement &&
        ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, hostElement)}
    </>
  );
};

export default Modal;
