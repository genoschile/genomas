import { ButtonSuggestion } from "./ButtonSuggestion";

export const MessageIaSuggestions = ({
  data,
  onSelect,
}: {
  data: Record<string, string[] | undefined>;
  onSelect: (category: string, value: string) => void;
}) => {
  const titles: Record<string, string> = {
    usuario: "Usuario",
    grupos: "Grupos",
    acceso: "Acceso",
  };

  return (
    <div className="msg--bot">
      {Object.entries(data).map(([category, values]) =>
        values && values.length > 0 ? (
          <ButtonSuggestion
            key={category}
            title={titles[category] ?? category}
            values={values}
            category={category}
            onSelect={onSelect}
          />
        ) : null
      )}
    </div>
  );
};