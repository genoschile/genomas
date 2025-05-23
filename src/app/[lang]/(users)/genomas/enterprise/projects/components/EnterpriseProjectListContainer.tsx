import { ContainerDefaultEnterprise } from "../../components/ContainerDefaultEnterprise";

import "./enterpriseProjectListContainer.css";

const headers = ["Nombre", "Fecha de creación", "Dueño", "Acciones", "Estado"];
const data = [
  ["Proyecto 1", "2024-05-01", "Juan", "Ver"],
  ["Proyecto 2", "2024-06-15", "Ana", "Editar"],
];

export const EnterpriseProjectListContainer = () => {
  return (
    <ContainerDefaultEnterprise dinamicStyle="enterprise-projects__list">
      <div className="table">
        {/* Encabezados */}
        <ul
          className="table-header"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${headers.length}, 1fr)`,
          }}
        >
          {headers.map((header, index) => (
            <li key={index}>{header}</li>
          ))}
        </ul>

        {/* Filas */}
        {data.map((row, rowIndex) => (
          <ul
            className="table-row"
            key={rowIndex}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${headers.length}, 1fr)`,
            }}
          >
            {row.map((cell, cellIndex) => (
              <li key={cellIndex}>{cell}</li>
            ))}
          </ul>
        ))}
      </div>
    </ContainerDefaultEnterprise>
  );
};
