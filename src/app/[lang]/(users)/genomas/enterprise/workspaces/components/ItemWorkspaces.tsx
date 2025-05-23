import { IconRoundedFull } from "@/components/enterprise/iconRoundedFull/IconRoundedFull";
import "./itemWorkspaces.css";
import { MdWorkspacesFilled } from "react-icons/md";
import { Workspace } from "@/context/enterprise/WorkspacesEnterpriseContext";

export const ItemWorkspace = ({ workspace }: { workspace: Workspace }) => {
  return (
    <li className="container__list-workspaces-item">
      <div>
        <ItemWorkspaceHeader
          name={workspace.name}
          description={workspace.description}
        />
        <ItemWorkspaceFigure />

        <ItemWorksArticleContainer>
          <p>Projects ({workspace.projects?.length === 0 ? "" : "0"})</p>
          <div>
            {workspace.projects?.map((_, idx) => (
              <div key={idx}></div>
            ))}
          </div>
        </ItemWorksArticleContainer>

        <ItemWorksArticleContainer>
          <p>Assigned Groups (0)</p>
          <div></div>
        </ItemWorksArticleContainer>

        <ItemWorksArticleContainer>
          <p>Assigned Users ({workspace.members.length})</p>
          <div>
            {workspace.members.map((_, idx) => (
              <div key={idx}></div>
            ))}
          </div>
        </ItemWorksArticleContainer>

        <ItemWorksArticleContainer>
          <p>Last Activity</p>
          <div>
            <span>{new Date(workspace.createdAt).toLocaleDateString()}</span>
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

export const ItemWorkspaceHeader = ({
  name,
  description,
}: {
  name: string;
  description?: string;
}) => {
  return (
    <header>
      <div>
        <h3>{name}</h3>
        <IconRoundedFull icon={<MdWorkspacesFilled />} />
      </div>
      <p>{description ?? "No description provided."}</p>
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
