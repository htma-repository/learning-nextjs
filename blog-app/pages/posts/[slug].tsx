import { GetStaticProps } from "next";
import Head from "next/head";

import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "../../lib/posts-util";
import { IPost } from "../../types/types";

interface IProps {
  post: IPost;
}

function PostDetailPage({ post }: IProps) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <PostContent post={post} />
    </>
  );
}

export const getStaticProps: GetStaticProps = (context) => {
  const { params } = context;

  const postData = getPostData(params?.slug as string);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
};

export function getStaticPaths() {
  const postFilenames = getPostsFiles();

  const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ""));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
}

export default PostDetailPage;
