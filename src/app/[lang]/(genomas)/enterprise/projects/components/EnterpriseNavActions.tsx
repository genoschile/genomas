"use client";

import { IconRoundedFull } from "@/components/enterprise/iconRoundedFull/IconRoundedFull";
import { ContainerDefaultEnterprise } from "../../components/ContainerDefaultEnterprise";
import { FaAndroid } from "react-icons/fa6";

import "./enterpriseNavActions.css";
import { useModalContext } from "@/hooks/useModalsProject";
import { MODAL_IDS } from "@/context/ModalsProject";

export const EnterpriseNavActions = () => {
  const { openModal } = useModalContext();

  return (
    <ContainerDefaultEnterprise dinamicStyle="enterprise-projects--nav-actions">
      <div>
        <nav>
          <button onClick={() => openModal(MODAL_IDS.ADD_PROJECT_ENTERPRISE)}>
            <IconRoundedFull icon={<FaAndroid />} />
          </button>
        </nav>
      </div>
    </ContainerDefaultEnterprise>
  );
};
