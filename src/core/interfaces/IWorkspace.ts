import { PipelineType } from "@core/interfaces/enums";

export interface IWorkspace {
  id: string;
  name: string;
  pipelineType: PipelineType;
  organizationId?: string;
  ownerId: string;
}
