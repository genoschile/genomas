"use client";

import { createContext, useState } from "react";

interface Project {
  name: string;
  description: string;
  sharedWith?: string[];
}

interface ProjectContextProps {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  selectedCards: string[];
  toggleCardSelection: (cardName: string) => void;
  isSelected: (cardName: string) => boolean;
}

export const ProjectContext = createContext<ProjectContextProps | undefined>(
  undefined
);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  const [projects, setProjects] = useState<Project[]>([
    {
      name: "karen@genomas.com",
      description: "Proyecto de análisis genómico basado en IA.",
      sharedWith: ["carlos@genomas.com", "laura@genomas.com"],
    },
    {
      name: "bioinformatics-hub",
      description:
        "Plataforma colaborativa para investigaciones en bioinformática.",
      sharedWith: ["ana@biohub.com", "marco@biohub.com"],
    },
    {
      name: "med-data-secure",
      description: "Sistema de almacenamiento seguro para historiales médicos.",
    },
    {
      name: "genome-mapper",
      description:
        "Aplicación para mapeo y visualización de secuencias genéticas.",
      sharedWith: ["sofia@genomas.com"],
    },
  ]);

  const toggleCardSelection = (cardName: string) => {
    setSelectedCards((prevSelected) =>
      prevSelected.includes(cardName)
        ? prevSelected.filter((name) => name !== cardName)
        : [...prevSelected, cardName]
    );
  };

  const isSelected = (cardName: string) => selectedCards.includes(cardName);

  const value: ProjectContextProps = {
    projects,
    setProjects,
    selectedCards,
    toggleCardSelection,
    isSelected,
  };

  return (
    <ProjectContext value={value}>{children}</ProjectContext>
  );
};
