import { IconRoundedFull } from "@/components/enterprise/iconRoundedFull/IconRoundedFull";
import "./groupsCard.css";
import { FaEdit, FaUser } from "react-icons/fa";
import { GroupsCardMembers } from "./GroupsCardMembers";
import { GroupsCardHeader } from "./GroupsCardHeader";
import { MdDelete } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";

export const GroupsCard = ({ item }: { item: string; key: number }) => {
  return (
    <li className="groupsCard">
      <GroupsCardHeader />

      <GroupsCardMembers />

      <article></article>

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
