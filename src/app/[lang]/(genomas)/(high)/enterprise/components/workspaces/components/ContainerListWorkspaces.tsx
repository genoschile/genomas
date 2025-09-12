"use client";

import { useWorkspacesContext } from "@/context/enterprise/WorkspacesEnterpriseContext";
import { ItemWorkspace } from "./ItemWorkspaces";
import "./containerListWorkspaces.css";

export const ContainerListWorkspaces = ({}: {}) => {
  const { workspaces, loading } = useWorkspacesContext();

  if (loading) {
    return (
      <ul className="container__list-workspaces">
        {[...Array(3)].map((_, i) => (
          <SkeletonWorkspace key={i} />
        ))}
      </ul>
    );
  }

  return (
    <ul className="container__list-workspaces">
      {workspaces.map((workspace) => (
        <ItemWorkspace key={workspace.id} workspace={workspace} />
      ))}
    </ul>
  );
};

export const SkeletonWorkspace = () => {
  return (
    <li className="container__list-workspaces-item skeleton">
      <div>
        <header>
          <div>
            <span className="skeleton__circle" />
            <span className="skeleton__line short" />
          </div>
          <p className="skeleton__line medium" />
        </header>

        <figure>
          <div className="skeleton__image" />
        </figure>

        <article>
          <div className="skeleton__line long" />
          <div className="skeleton__line medium" />
        </article>

        <footer>
          <div>
            <div className="skeleton__button" />
            <div className="skeleton__button" />
          </div>
        </footer>
      </div>
    </li>
  );
};
