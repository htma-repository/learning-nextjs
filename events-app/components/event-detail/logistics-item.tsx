import classes from "./logistics-item.module.css";

interface IProps {
  icon: React.ReactNode;
  children: React.ReactNode;
}

const LogisticsItem = ({ icon, children }: IProps) => {
  return (
    <li className={classes.item}>
      <span className={classes.icon}>{icon}</span>
      <span className={classes.content}>{children}</span>
    </li>
  );
};

export default LogisticsItem;
