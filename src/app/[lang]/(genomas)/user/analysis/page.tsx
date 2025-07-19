"use client";

import { SearchSection } from "@/components/analysis/searchs/SearchSection";
import "./page.css";
import { TableInputFiles } from "@/components/analysis/tables/TableInputFiles";
import { TableOutputFiles } from "@/components/analysis/tables/TableOutputFiles";
import { ArticleContainer } from "@/components/container/ProjectHomeArticleContainer";

export default function page() {
  return (
    <>
      <SearchSection />
      
      <ArticleContainer>
        <TableInputFiles />
      </ArticleContainer>

      <ArticleContainer>
        <TableOutputFiles />
      </ArticleContainer>
    </>
  );
}
