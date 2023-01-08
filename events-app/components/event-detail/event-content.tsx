import classes from "./event-content.module.css";

interface IProps {
  children: React.ReactNode;
}

const EventContent = ({ children }: IProps) => {
  return <section className={classes.content}>{children}</section>;
};

export default EventContent;
