import { FaTrashAlt } from "react-icons/fa";

export const HeaderTableTrash = [
  "Select",
  "File Name",
  "Original Location",
  "Date Deleted",
  "Size",
  "Date Eliminated",
  "Actions",
];

export const TrashContainer = () => {
  return (
    <div className="project__trash--container">
      <ul className="trash__table">
        <li className="trash__table--row trash__table--header">
          {HeaderTableTrash.map((header, index) => (
            <div key={index} className="trash__table--cell">
              {header}
            </div>
          ))}
        </li>

        <li className="trash__table--row">
          <label className="trash__table--cell" htmlFor="checkboxTrash">
            <input id="checkboxTrash" type="checkbox" />
          </label>
          <div className="trash__table--cell">report.docx</div>
          <div className="trash__table--cell">/documents/reports</div>
          <div className="trash__table--cell">2025-06-01</div>
          <div className="trash__table--cell">1.2 MB</div>
          <div className="trash__table--cell">2025-06-08</div>
          <div className="trash__table--cell">
            <span>...</span>
          </div>
        </li>
      </ul>
    </div>
  );
};
