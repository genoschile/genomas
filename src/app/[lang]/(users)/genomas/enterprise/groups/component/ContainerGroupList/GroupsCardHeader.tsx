import { IconRoundedFull } from "@/components/enterprise/iconRoundedFull/IconRoundedFull";
import { MdGroups2 } from "react-icons/md";

export const GroupsCardHeader = ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  return (
    <header className="groupsCardHeader">
      <div>
        <h3>{name}</h3>
        <IconRoundedFull icon={<MdGroups2 />} />
      </div>
      <small>{description}</small>
    </header>
  );
};
