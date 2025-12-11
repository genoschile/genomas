import { IconRoundedFull } from "@/features/enterprise/components/enterprise/iconRoundedFull/IconRoundedFull";
import { MdGroups2 } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

export const GroupsCardHeader = ({
  name,
  description,
  userCount = 0,
}: {
  name: string;
  description: string;
  userCount?: number;
}) => {
  return (
    <header className="groupsCardHeader">
      <div>
        <h3>{name}</h3>
        <IconRoundedFull icon={<MdGroups2 />} />
      </div>
      {userCount > 0 && (
        <div className="group-users-count-badge">
          <FaUsers size={12} />
          <span>{userCount} {userCount === 1 ? 'usuario' : 'usuarios'}</span>
        </div>
      )}
      <small>{description}</small>
    </header>
  );
};
