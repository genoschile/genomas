import { SearchSection } from "@/components/analysis/searchs/SearchSection";
import "./page.css";
import { HeaderTabs } from "@/components/analysis/headerTabs/HeaderTabs";
import { SearchFilterTable } from "@/components/analysis/searchs/SearchFilterTable";

const headerTables = ["File", "Workflow", "Id process", "Status"];

export default function page() {
  return (
    <section className="analysys-container">
      <HeaderTabs />
      <SearchSection />

      <article className="table__inputs_files">
        <table>
          <caption>User input files</caption>
          <thead>
            <tr>
              <th colSpan={headerTables.length}>
                <SearchFilterTable />
              </th>
            </tr>
            <tr>
              {headerTables.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr>
              <td data-cell="File">File 1</td>
              <td data-cell="Workflow">Workflow 1</td>
              <td data-cell="Id process">Id process 1</td>
              <td data-cell="Status">Status 1</td>
            </tr>
          </tbody>

          <tfoot>
            <tr>
              <td colSpan={headerTables.length}>
                End of table - Last 14 world F1 champions
              </td>
            </tr>
          </tfoot>
        </table>
      </article>

      {/* <article className="table__outputs_files">
        <table>
          <caption>The last 14 world F1 champions</caption>

          <thead>
            <tr>
              <th>Name</th>
              <th>Poles</th>
              <th>Podiums</th>
              <th>Wins</th>
              <th>Career points</th>
              <th>Championships</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td data-cell="name">Benja</td>
              <td data-cell="Poles">22</td>
              <td data-cell="Podiums">80</td>
              <td data-cell="Wins">37</td>
              <td data-cell="Career points">2080.5</td>
              <td data-cell="Championships">2</td>
            </tr>
          </tbody>

          <tfoot>
            <tr>
              <td colSpan={6}>End of table - Last 14 world F1 champions</td>
            </tr>
          </tfoot>
        </table>
      </article> */}
    </section>
  );
}
