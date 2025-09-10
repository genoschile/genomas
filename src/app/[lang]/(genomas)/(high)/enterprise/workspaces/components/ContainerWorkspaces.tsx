import "./containerWorkspaces.css";

export const ContainerWorkspaces = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="container__workspaces">{children}</div>;
};
