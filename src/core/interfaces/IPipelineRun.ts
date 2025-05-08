import { RunStatus } from "@core/interfaces/enums";

export interface IPipelineRun {
  id: string;
  startedAt: Date;
  endedAt?: Date;
  status: RunStatus;
  workflow: string;
  name?: string;
  description?: string;
  projectId: string;
  createdById?: string;
  createdAt: Date;
  updatedAt: Date;
}
