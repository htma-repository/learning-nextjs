import React from "react";
import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";

import Image from "next/image";
import { IPost } from "../types/types";

interface IProps {
  className: string;
  post: IPost;
}

SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("css", css);

const useMarkdown = ({ className, post }: IProps) => {
  const customRenderers = () => {
    return {
      p({ node, children }: any) {
        if (node.children[0].tagName === "img") {
          const image = node.children[0];

          return (
            <div className={className}>
              <Image
                src={`/images/posts/${post.slug}/${image.properties.src}`}
                alt={image.alt}
                width={600}
                height={300}
              />
            </div>
          );
        }

        return <p>{children}</p>;
      },

      code({ className, children }: any) {
        const language = className.split("-")[1]; // className is something like language-js => We need the "js" part here
        return (
          <SyntaxHighlighter style={atomDark} language={language}>
            {children}
          </SyntaxHighlighter>
        );
      },
    };
  };

  return customRenderers;
};

export default useMarkdown;
