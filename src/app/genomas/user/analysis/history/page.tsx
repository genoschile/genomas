import { SearchSection } from "@/components/analysis/searchs/SearchSection";
import { TableJobHistory } from "@/components/analysis/tables/TableJobHistory";

export default function page() {
  return (
    <>
      <SearchSection />
      <TableJobHistory />
    </>
  );
}
