import { IoMdAddCircleOutline } from "react-icons/io";
import "../metrics/metricsEnterprise.css";
import { IconRoundedFull } from "../iconRoundedFull/IconRoundedFull";

export const QuickActionsUsers = () => {
  return (
    <div className="box box-link">
      <IconRoundedFull icon={<IoMdAddCircleOutline size={24} />} />
      <a href="#">Create New User</a>
    </div>
  );
};

export const QuickActionsProjects = () => {
  return (
    <div className="box box-link">
      <IconRoundedFull icon={<IoMdAddCircleOutline size={24} />} />
      <a href="#">Create New Project</a>
    </div>
  );
};

export const QuickActionsGroups = () => {
  return (
    <div className="box box-link">
      <IconRoundedFull icon={<IoMdAddCircleOutline size={24} />} />
      <a href="#">Create New Group</a>
    </div>
  );
};
