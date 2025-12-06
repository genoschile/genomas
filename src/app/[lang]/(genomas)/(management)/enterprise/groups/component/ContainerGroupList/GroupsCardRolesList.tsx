import { IconRoundedFull } from "@/components/enterprise/iconRoundedFull/IconRoundedFull";
import { Group } from "@/context/enterprise/GroupsEnterpriseContext";
import { FaUser } from "react-icons/fa";

export const GroupsCardRolesList = ({ role }: Pick<Group, "role">) => {
  return (
    <ul className="groupsCardRolesList">
      {role.map((r, index) => (
        <li key={index}>
          <span>{r}</span>
        </li>
      ))}
    </ul>
  );
};