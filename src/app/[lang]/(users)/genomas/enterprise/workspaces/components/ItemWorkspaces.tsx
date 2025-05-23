import { IconRoundedFull } from "@/components/enterprise/iconRoundedFull/IconRoundedFull";
import { Fa0 } from "react-icons/fa6";

import "./itemWorkspaces.css";

export const ItemWorkspace = () => {
  return (
    <li className="container__list-workspaces-item">
      <div>
        <ItemWorkspaceHeader />

        <ItemWorkspaceFigure />

        <ItemWorksArticleContainer>
          <p>Projects ({2}) </p>

          <div>
            <div></div>
            <div></div>
          </div>
        </ItemWorksArticleContainer>

        <ItemWorksArticleContainer>
          <p>Assigned Groups ({2}) </p>

          <div>
            <div></div>
            <div></div>
          </div>
        </ItemWorksArticleContainer>

        <ItemWorksArticleContainer>
          <p>Assigned Users ({2}) </p>

          <div>
            <div></div>
            <div></div>
          </div>
        </ItemWorksArticleContainer>

        <ItemWorksArticleContainer>
          <p>Last Activity</p>

          <div>
            <div></div>
            <div></div>
          </div>
        </ItemWorksArticleContainer>

        <hr />
        <ItemWorkspaceFooter />
      </div>
    </li>
  );
};

export const ItemWorkspaceFooter = () => {
  return (
    <footer>
      <div>
        <button>Delete</button>
        <button>Edit</button>
      </div>
    </footer>
  );
};

export const ItemWorkspaceFigure = () => {
  return (
    <figure>
      <img src="/images/carrousel/car3.svg" alt="" />
    </figure>
  );
};

import { MdWorkspacesFilled } from "react-icons/md";

export const ItemWorkspaceHeader = () => {
  return (
    <header>
      <div>
        <h3>Nombre del workspace</h3>
        <IconRoundedFull icon={<MdWorkspacesFilled />} />
      </div>
      <p>Descripción del workspace</p>
    </header>
  );
};

export const ItemWorksArticleContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <article>{children}</article>;
};
