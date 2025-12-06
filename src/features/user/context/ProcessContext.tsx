"use client";

import { createContext, useContext, useState } from "react";

export type TaskStatus = "pending" | "running" | "done" | "fail";

export interface TaskInfo {
  id: string;
  fileName: string;
  workflow: string;
  status: TaskStatus;
}

interface ProcessContextType {
  tasks: TaskInfo[];
  addTask: (task: TaskInfo) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
}

const ProcessContext = createContext<ProcessContextType | null>(null);

export const useProcessContext = () => {
  const ctx = useContext(ProcessContext);
  if (!ctx) throw new Error("ProcessContext must be used inside provider");
  return ctx;
};

export const ProcessContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tasks, setTasks] = useState<TaskInfo[]>([]);

  const addTask = (task: TaskInfo) => {
    setTasks((prev) => [...prev, task]);
  };

  const updateTaskStatus = (id: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };

  return (
    <ProcessContext.Provider value={{ tasks, addTask, updateTaskStatus }}>
      {children}
    </ProcessContext.Provider>
  );
};
