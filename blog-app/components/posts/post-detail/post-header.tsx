import Image from "next/image";

import classes from "./post-header.module.css";

interface IProps {
  title: string;
  image: string;
}

function PostHeader({ title, image }: IProps) {
  return (
    <header className={classes.header}>
      <h1>{title}</h1>
      <Image src={image} alt={title} width={200} height={150} />
    </header>
  );
}

export default PostHeader;
