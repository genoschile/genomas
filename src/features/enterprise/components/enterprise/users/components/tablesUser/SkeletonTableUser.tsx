import "./SkeletonTableUser.css";

export const SkeletonTable = ({ rows = 3 }) => {
  return (
    <ul className="skeleton-user-list">
      {Array.from({ length: rows }).map((_, index) => (
        <li key={index} className="skeleton-user-item">
          {Array.from({ length: 7 }).map((__, cellIndex) => (
            <div key={cellIndex} className="skeleton skeleton-cell" />
          ))}
        </li>
      ))}
    </ul>
  );
};
