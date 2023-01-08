import Link from "next/link";

import classes from "./button.module.css";

interface IProps {
  link?: string;
  onClick?: () => {};
  children: React.ReactNode;
}

const Button = ({ link, onClick, children }: IProps) => {
  if (link) {
    return (
      <Link href={link} className={classes.btn}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes.btn} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
