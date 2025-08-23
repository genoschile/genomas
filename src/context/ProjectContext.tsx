"use client";

import { useSessionContext } from "@/hooks/useSession";
import { routes } from "@/lib/api/routes";
import { IProject } from "@/lib/types/contextTypes";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface ProjectContextProps {
  projects: IProject[];
  setProjects: Dispatch<SetStateAction<IProject[]>>;
  selectedCards: string[];
  toggleCardSelection: (cardId: string) => void;
  isSelected: (cardId: string) => boolean;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  addProject: (project: IProject) => void;
  onOpen: { id: string; onOpen: boolean };
  onSetOpen: ({ id, onOpen }: { id: string; onOpen: boolean }) => void;
  setSelectedCards: (cards: string[]) => void;
  ChangeSelectedProjectId: (id: string | null) => void;
  selectedProjectId: string | null;
}

export const ProjectContext = createContext<ProjectContextProps | undefined>(
  undefined
);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [onOpen, onSetOpen] = useState<{ id: string; onOpen: boolean }>({
    id: "",
    onOpen: false,
  });

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );

  const ChangeSelectedProjectId = (id: string | null) => {
    console.log("Changing selected project ID to:", id);
    setSelectedProjectId(id);
  };

  const { user } = useSessionContext();

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user || !user.id) return;

      try {
        setIsLoading(true);
        const res = await fetch(routes.getFilesOfUser(user.id));

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

  const addProject = (project: IProject) => {
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
    onOpen,
    onSetOpen,
    setSelectedCards,
    ChangeSelectedProjectId,
    selectedProjectId,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};
