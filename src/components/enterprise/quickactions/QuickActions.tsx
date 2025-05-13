import { IoMdAddCircleOutline } from "react-icons/io";
import "../metrics/metricsEnterprise.css";
import { IconRoundedFull } from "../iconRoundedFull/IconRoundedFull";

export const QuickActions = () => {
  return (
    <div className="grid-container">
      <div className="box box-link">
        <IconRoundedFull icon={<IoMdAddCircleOutline size={24} />} />
        <a href="#">Create New Users</a>
      </div>
      <div className="box box-link">
        <IconRoundedFull icon={<IoMdAddCircleOutline size={24} />} />
        <a href="#">Create New Groups</a>
      </div>
    </div>
  );
};
