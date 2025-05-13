import "./headerMainSectionEnterprise.css";

export const ChatSuggestionTitle = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <header className="headerMainSectionEnterprise">
      <h1 className="title">{title}</h1>
      <p className="subtitle">{description}</p>
    </header>
  );
};
