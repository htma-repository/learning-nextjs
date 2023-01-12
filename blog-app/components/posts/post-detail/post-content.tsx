import ReactMarkdown from "react-markdown";
// import Image from "next/image";
// import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
// import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
// import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
// import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";

import PostHeader from "./post-header";
import useMarkdown from "../../../hooks/useMarkdown";
import { IPost } from "../../../types/types";

import classes from "./post-content.module.css";

interface IProps {
  post: IPost;
}

// SyntaxHighlighter.registerLanguage("js", js);
// SyntaxHighlighter.registerLanguage("css", css);

function PostContent({ post }: IProps) {
  const customRenderers = useMarkdown({ className: classes.image, post: post });
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  // const customRenderers = {
  //   // img(image) {
  //   //   return (
  //   //     <Image
  //   //       src={`/images/posts/${post.slug}/${image.src}`}
  //   //       alt={image.alt}
  //   //       width={600}
  //   //       height={300}
  //   //     />
  //   //   );
  //   // },
  //   p({ node, children }: any) {
  //     if (node.children[0].tagName === "img") {
  //       const image = node.children[0];

  //       return (
  //         <div className={classes.image}>
  //           <Image
  //             src={`/images/posts/${post.slug}/${image.properties.src}`}
  //             alt={image.alt}
  //             width={600}
  //             height={300}
  //           />
  //         </div>
  //       );
  //     }

  //     return <p>{children}</p>;
  //   },

  //   code({ className, children }: any) {
  //     const language = className.split("-")[1]; // className is something like language-js => We need the "js" part here
  //     return (
  //       // <SyntaxHighlighter
  //       //   style={atomDark}
  //       //   language={language}
  //       //   children={children}
  //       // />

  //       <SyntaxHighlighter style={atomDark} language={language}>
  //         {children}
  //       </SyntaxHighlighter>
  //     );
  //   },
  // };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderers()}>
        {post.content as string}
      </ReactMarkdown>
    </article>
  );
}

export default PostContent;
