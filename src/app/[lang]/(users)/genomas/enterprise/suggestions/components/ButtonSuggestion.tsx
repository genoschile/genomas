export const ButtonSuggestion = ({
  title,
  values,
  category,
  onSelect,
}: {
  title: string;
  values: string[];
  category: string;
  onSelect: (category: string, value: string) => void;
}) => {
  return (
    <>
      {values.map((value) => (
        <button
          key={value}
          onClick={() => onSelect(category, value)}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#3b82f6",
            color: "#fff",
            borderRadius: "0.375rem",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          {value}
        </button>
      ))}
    </>
  );
};
