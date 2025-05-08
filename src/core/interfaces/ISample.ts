import {
  InputSource,
  SequenceType,
} from "@core/interfaces/enums";

export interface ISample {
  id: number;
  sampleName: string;
  reportDate: Date;
  sampleType: InputSource;
  sequencingType: SequenceType;
  disease: string;
  folioNumber: number;
  createdById?: string;
  createdAt: Date;
  updatedAt: Date;
}
