import { IconRoundedFull } from "@/components/enterprise/iconRoundedFull/IconRoundedFull";
import "./groupsCard.css";
import { FaEdit, FaUser } from "react-icons/fa";
import { GroupsCardMembers } from "./GroupsCardMembers";
import { GroupsCardHeader } from "./GroupsCardHeader";
import { MdDelete } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { Group } from "@/context/enterprise/GroupsEnterpriseContext";

export const GroupsCard = ({ item }: { item: Group }) => {
  return (
    <li className="groupsCard">
      <GroupsCardHeader name={item.name} description={item.description} />

      {item.users && item.users.length > 0 ? (
        <GroupsCardMembers
          members={item.users.map((u: any) => ({ id: u.id, name: u.name }))}
        />
      ) : (
        <div className="noMembers">
          <span>
            <FaUser />
          </span>
          No hay miembros
        </div>
      )}

      <article>
        <small>Roles</small>
        {item.role}
      </article>

      <hr />

      <footer>
        <div>
          <button>
            <span>
              <FaEdit />
            </span>
            Edit
          </button>
          <button>
            <span>
              <MdDelete />
            </span>
            Delete
          </button>
        </div>

        <span>
          <IconRoundedFull icon={<IoSettingsSharp />} />
        </span>
      </footer>
    </li>
  );
};
