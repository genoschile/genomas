import { IconRoundedFull } from "@/components/enterprise/iconRoundedFull/IconRoundedFull";
import { MdGroups2 } from "react-icons/md";

export const GroupsCardHeader = () => {
  return (
    <header className="groupsCardHeader">
      <div>
        <h3>Groupss</h3>
        <IconRoundedFull icon={<MdGroups2 />} />
      </div>
      <small>
        This groups lorem lorem lorem Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Rerum,{" "}
      </small>
    </header>
  );
};
