import { TagType } from "@core/interfaces/enums";

export interface ITag {
  id: string;
  name: string;
  type: TagType;
}

export interface IDocumentTag {
  id: string;
  fileId: string;
  tagId: string;
}
