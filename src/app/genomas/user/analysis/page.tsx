import "./page.css";

export default function page() {
  return (
    <section className="analysys-container">
      <header>
        <nav className="navigation">
          <button type="button">Data</button>
          <button type="button">Job History</button>
        </nav>
      </header>

      <search className="search-section">
        <form className="search-form" role="search">
          <label htmlFor="search-data" className="visually-hidden">
            Search Data
          </label>
          <input type="text" id="search-data" placeholder="Enter data" />

          <label htmlFor="search-query" className="visually-hidden">
            Search Query
          </label>
          <input type="text" id="search-query" placeholder="Search" />

          <button type="submit">Search</button>
        </form>
      </search>

      <article className="table__inputs_files">
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
      </article>

      <article className="table__outputs_files">
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
      </article>
    </section>
  );
}
