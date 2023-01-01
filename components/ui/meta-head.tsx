import React from "react";
import Head from "next/head";

interface IProps {
  title: string;
  desc: string | undefined;
}

const MetaHead = ({ desc, title }: IProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="apple-touch-icon" href="/static/images/favicon.ico" />
    </Head>
  );
};

export default MetaHead;
