import Image from "next/image";

import styles from "./card.module.css";

interface Props {
  image: string;
  title: string;
  imgClassName: string;
  children: string;
  date: string;
  location: string;
}

const Card = ({
  image,
  title,
  imgClassName,
  children,
  date,
  location,
}: Props) => {
  return (
    <div className={styles.card}>
      <Image
        src={image}
        alt={title}
        loading="lazy"
        className={imgClassName}
        width="200"
        height="300"
      />
      <div className={styles["card__desc"]}>
        <h3 className={styles["card__title"]}>{children}</h3>
        <span>{date}</span>
        <span>{location}</span>
      </div>
    </div>
  );
};

export default Card;
