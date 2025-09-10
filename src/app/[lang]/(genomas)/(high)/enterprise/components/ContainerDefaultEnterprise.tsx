import "./containerDefaultEnterprise.css";

export const ContainerDefaultEnterprise = ({
  children,
  dinamicStyle,
}: {
  children: React.ReactNode;
  dinamicStyle?: string;
}) => {
  return (
    <div className={`default-container-enterprise ${dinamicStyle}`}>
      {children}
    </div>
  );
};
