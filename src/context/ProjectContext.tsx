"use client";

import { useSessionContext } from "@/hooks/useSession";
import { createContext, useEffect, useState } from "react";

interface Project {
  name: string;
  description: string;
  sharedWith?: string[];
  id: string;
  workspaceId: string; 
}

interface ProjectContextProps {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  selectedCards: string[];
  toggleCardSelection: (cardId: string) => void;
  isSelected: (cardId: string) => boolean;
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

  const toggleCardSelection = (cardId: string) => {
    setSelectedCards((prevSelected) =>
      prevSelected.includes(cardId)
        ? prevSelected.filter((id) => id !== cardId)
        : [...prevSelected, cardId]
    );
  };

  const addProject = (project: Project) => {
    setProjects((prevProjects) => [...prevProjects, project]);
  };

  const isSelected = (cardId: string) => selectedCards.includes(cardId);
  
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
