"use client"

import { IoMdAddCircleOutline } from "react-icons/io";
import "../metrics/metricsEnterprise.css";
import { IconRoundedFull } from "../iconRoundedFull/IconRoundedFull";
import { useModalContext } from "@/hooks/useModalsProject";
import { MODAL_IDS } from "@/context/ModalsProject";

export const QuickActionsUsers = () => {
  const { openModal } = useModalContext();

  return (
    <div
      className="box box-link"
      onClick={() => openModal(MODAL_IDS.ADD_USER_ENTERPRISE)}
    >
      <IconRoundedFull icon={<IoMdAddCircleOutline size={24} />} />
      <button className="bg">Create New User</button>
    </div>
  );
};

export const QuickActionsProjects = () => {
  const { openModal } = useModalContext();
  return (
    <div
      className="box box-link"
      onClick={() => openModal(MODAL_IDS.ADD_PROJECT_ENTERPRISE)}
    >
      <IconRoundedFull icon={<IoMdAddCircleOutline size={24} />} />
      <button className="bg">Create New Project</button>
    </div>
  );
};

export const QuickActionsGroups = () => {
  const { openModal } = useModalContext();
  return (
    <div
      className="box box-link"
      onClick={() => openModal(MODAL_IDS.ADD_GROUPS_ENTERPRISE)}
    >
      <IconRoundedFull icon={<IoMdAddCircleOutline size={24} />} />
      <button className="bg">Create New Group</button>
    </div>
  );
};
