"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
  ReactNode,
} from "react";

export interface RunData {
  pipeline: string;
  status: string;
  statusType: "success" | "in-progress" | "failure";
  color: string;
  path: string;
  runId: string;
  sampleType: string;
  date: string;
  duration: string;
  progress: number;
  logs: number;
  cost: string;
  tags: string[];
}

interface RunsContextType {
  runs: RunData[];
  loading: boolean;
  error: string | null;
  fetchRuns: () => Promise<void>;
  deleteRun: (runId: string) => Promise<void>;
}

const RunsContext = createContext<RunsContextType | undefined>(undefined);

export const RunsProvider = ({ children }: { children: ReactNode }) => {
  const [runs, setRuns] = useState<RunData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRuns = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/runs");
      if (!response.ok) {
        throw new Error("Error al obtener las ejecuciones");
      }
      const data: RunData[] = await response.json();
      console.log(data);
      setRuns(data);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar las ejecuciones");
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteRun = useCallback(async (runId: string) => {
    try {
      const response = await fetch(`/api/runs/${runId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error al eliminar la ejecución");
      }

      setRuns((prevRuns) => prevRuns.filter((run) => run.runId !== runId));
    } catch (err) {
      console.error(err);
      setError("No se pudo eliminar la ejecución");
    }
  }, []);

  useEffect(() => {
    fetchRuns();
  }, [fetchRuns]);

  return (
    <RunsContext.Provider
      value={{
        runs,
        loading,
        error,
        fetchRuns,
        deleteRun,
      }}
    >
      {children}
    </RunsContext.Provider>
  );
};

export const useRuns = () => {
  const context = useContext(RunsContext);
  if (!context) {
    throw new Error("useRuns debe usarse dentro de un RunsProvider");
  }
  return context;
};
