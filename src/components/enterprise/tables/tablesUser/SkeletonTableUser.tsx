import "./SkeletonTableUser.css";

export const SkeletonTable = ({ rows = 3 }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Select</th>
          <th>Imagen</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Role</th>
          <th>Groups</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, index) => (
          <tr key={index}>
            {Array.from({ length: 7 }).map((__, cellIndex) => (
              <td key={cellIndex}>
                <div className="skeleton skeleton-cell" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
