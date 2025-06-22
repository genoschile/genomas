"use client";

import "./style.css";

export const ArticleContainer = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <article className={`project__home--article ${className}`}>
      <div className="project__home--container">{children}</div>
    </article>
  );
};
