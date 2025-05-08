import { FileRole, FileType } from "@core/interfaces/enums";

export interface IFile {
  id: string;
  filename: string;
  path: string;
  fileType: FileType;
  fileRole: FileRole;
  uploadedAt: Date;
  projectId: string;
  sampleId?: number;
  pipelineRunId?: string;
  inputForRunId?: string;
  outputOfRunId?: string;
  createdById?: string;
  createdAt: Date;
  updatedAt: Date;
}
