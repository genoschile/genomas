import React, { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { highlight } from "sugar-high";
import "./mdx.css";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;
 
const components = {
  h1: (props: HeadingProps) => (
    <h1
      {...props}
      style={{
        fontWeight: 500,
        lineHeight: "1.25",
        fontSize: "2.25rem",
        paddingTop: "3rem",
        marginBottom: 0,
        blockSize: "fit-content",
      }}
    />
  ),
  h2: (props: HeadingProps) => (
    <h2
      style={{
        color: "red",
        fontWeight: 500,
      }}
      {...props}
    />
  ),
  h3: (props: HeadingProps) => (
    <h3
      style={{
        fontWeight: 500,
      }}
      {...props}
    />
  ),
  h4: (props: HeadingProps) => <h4 style={{ fontWeight: 500 }} {...props} />,
  p: (props: ParagraphProps) => <p style={{ lineHeight: 1.375 }} {...props} />,
  ol: (props: ListProps) => (
    <ol
      style={{
        listStyleType: "decimal",
        paddingLeft: "1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      style={{
        listStyleType: "disc",
        paddingLeft: "1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
      }}
      {...props}
    />
  ),
  li: (props: ListItemProps) => (
    <li style={{ paddingLeft: "0.25rem" }} {...props} />
  ),
  em: (props: ComponentPropsWithoutRef<"em">) => (
    <em style={{ fontWeight: 500 }} {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong style={{ fontWeight: 500 }} {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    if (href?.startsWith("/")) {
      return (
        <Link href={href} className={"mdxa"} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith("#")) {
      return (
        <a href={href} className={"mdxa"} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={"mdxa"}
        {...props}
      >
        {children}
      </a>
    );
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<"code">) => {
    const codeHTML = highlight(children as string);
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
  },
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <table>
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      style={{
        marginLeft: "0.075em",
        borderLeftWidth: "3px",
        borderLeftStyle: "solid",
        borderLeftColor: "#d1d5db",
        paddingLeft: "1rem",
        color: "#374151",
      }}
      {...props}
    />
  ),
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
