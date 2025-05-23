"use client";

import React, { useState } from "react";
import { ContainerDefaultEnterprise } from "../../components/ContainerDefaultEnterprise";

import "./enterpriseProjectHero.css";
import { IconRoundedFull } from "@/components/enterprise/iconRoundedFull/IconRoundedFull";
import { Fa42Group } from "react-icons/fa6";

const items: string[] = [
  "Crear nuevos proyectos",
  "Gestionar miembros",
  "Ver estadísticas",
  "Asignar grupos",
];

export const EnterpriseProjectHero = () => {
  const [selectedItem, setSelectedItem] = useState<string>(
    "No workspace seleccionado"
  );
  const [showList, setShowList] = useState<boolean>(false);

  const handleSelect = (item: string) => {
    setSelectedItem(item);
    setShowList(false);
  };

  return (
    <ContainerDefaultEnterprise dinamicStyle="enterprise-projects__hero">
      <div>
        Current Workspaces: 
        <nav className="custom-select">
          <button onClick={() => setShowList((prev) => !prev)}>
            {selectedItem}
          </button>
          {showList && (
            <ul>
              {items.map((item, index) => (
                <li key={index} onClick={() => handleSelect(item)}>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </nav>
      </div>

      <div>
          <IconRoundedFull icon={<Fa42Group />} />
      </div>
    </ContainerDefaultEnterprise>
  );
};
