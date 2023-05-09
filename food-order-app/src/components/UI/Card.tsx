import classes from "./Card.module.css";

const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = (
  props
) => {
  return <div className={`${classes.card}`}>{props.children}</div>;
};

export default Card;
