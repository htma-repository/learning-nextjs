import classes from "./event-summary.module.css";

interface IProps {
  title: string;
}

const EventSummary = ({ title }: IProps) => {
  return (
    <section className={classes.summary}>
      <h1>{title}</h1>
    </section>
  );
};

export default EventSummary;
