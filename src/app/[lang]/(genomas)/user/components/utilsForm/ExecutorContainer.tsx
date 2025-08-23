import { TableOutputFiles } from "@/components/analysis/tables/TableOutputFiles";
import { FooterModalUsersOptions } from "./FooterModalUsersOptions";

export const ExecutorContainer = () => {
  return (
    <div>
      <TableOutputFiles />
      <FooterModalUsersOptions />
    </div>
  );
};
