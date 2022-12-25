import classes from "./error-alert.module.css";

interface IProps {
  children: React.ReactNode;
}

const ErrorAlert = ({ children }: IProps) => {
  return <div className={classes.alert}>{children}</div>;
};

export default ErrorAlert;
