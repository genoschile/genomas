"use client";

import { SearchSection } from "@/components/analysis/searchs/SearchSection";
import "./page.css";
import { TableInputFiles } from "@/components/analysis/tables/TableInputFiles";
import { TableOutputFiles } from "@/components/analysis/tables/TableOutputFiles";

export default function page() {
  return (
    <>
      <SearchSection />

      <TableInputFiles />

      <TableOutputFiles />
    </>
  );
}
