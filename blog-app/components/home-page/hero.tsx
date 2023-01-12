import Image from "next/image";

import classes from "./hero.module.css";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/avatar.png"
          alt="An image showing Max"
          width={600}
          height={600}
          priority
        />
      </div>
      <h1>Hi, I&apos;m Hutama</h1>
      <p>
        I blog about web development - especially frontend frameworks like
        React.
      </p>
    </section>
  );
}

export default Hero;
