import { ItemWorkspace } from "./ItemWorkspaces";
import "./containerListWorkspaces.css";

export const ContainerListWorkspaces = ({}: {}) => {
  return (
    <ul className="container__list-workspaces">
      <ItemWorkspace />
    </ul>
  );
};
