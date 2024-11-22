import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";
interface IMarkdown {
  children: string;
}
export const Markdown = ({ children }: IMarkdown) => {
  return (
    <ReactMarkdown
      components={{
        h1: ({ node, ...props }) => <h1 style={{ color: "blue", fontSize:'22px' }} {...props} />,
        a: ({ node, ...props }) => (
          <a style={{ textDecoration: "underline" }} {...props} />
        ),
        img: ({ node, ...props }) => {
          if (!props.src) {
            return <div style={{ color: "red" }}>Изображение отсутствует</div>;
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
