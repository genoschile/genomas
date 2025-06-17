"use client";

import { useSessionContext } from "@/hooks/useSession";
import { createContext, useEffect, useState } from "react";

interface Project {
  name: string;
  description: string;
  sharedWith?: string[];
  id: string;
}

interface ProjectContextProps {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  selectedCards: string[];
  toggleCardSelection: (cardName: string) => void;
  isSelected: (cardName: string) => boolean;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  addProject: (project: Project) => void;
}

export const ProjectContext = createContext<ProjectContextProps | undefined>(
  undefined
);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useSessionContext();

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user || !user.id) return;

      try {
        setIsLoading(true);
        const res = await fetch(`/api/users/${user.id}/projects`);

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();

        if (!data.success) throw new Error(data.message);

        setProjects(data.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [user]);

  const toggleCardSelection = (cardName: string) => {
    setSelectedCards((prevSelected) =>
      prevSelected.includes(cardName)
        ? prevSelected.filter((name) => name !== cardName)
        : [...prevSelected, cardName]
    );
  };

  const addProject = (project: Project) => {
    setProjects((prevProjects) => [...prevProjects, project]);
  };

  const isSelected = (cardName: string) => selectedCards.includes(cardName);

  const value: ProjectContextProps = {
    projects,
    setProjects,
    selectedCards,
    toggleCardSelection,
    isSelected,
    isLoading,
    setIsLoading,
    addProject,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};
