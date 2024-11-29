import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";
import style from "./markdown.module.scss";
interface IMarkdown {
  children: string;
}
export const Markdown = ({ children }: IMarkdown) => {
  return (
    <ReactMarkdown
      className={style.markdown}
      components={{
        h1: ({ node, ...props }) => <h1 {...props} />,
        a: ({ node, ...props }) => <a {...props} />,
        img: ({ node, ...props }) => {
          if (!props.src) {
            return <div>Изображение отсутствует</div>;
          }
          return (
            <Image
              src={props.src}
              alt={props.alt || "Изображение"}
              style={{
                maxWidth: "100%",
                objectFit: "cover",
              }}
              width={300}
              height={300}
              //   {...props}
            />
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
