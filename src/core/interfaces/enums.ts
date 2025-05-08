export enum UserType {
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
}

export enum Role {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  VIEWER = "VIEWER",
}

export enum PipelineType {
  CANCER = "CANCER",
  GERMLINE = "GERMLINE",
  BACTERIA = "BACTERIA",
}

export enum InputSource {
  SOMATIC = "SOMATIC",
  GERMINAL = "GERMINAL",
  LIQUID_BIOPSY = "LIQUID_BIOPSY",
  CLINICAL = "CLINICAL",
}

export enum SequenceType {
  WHOLE_GENOME = "WHOLE_GENOME",
  WHOLE_EXOME = "WHOLE_EXOME",
  GENOMIC_PANEL = "GENOMIC_PANEL",
}

export enum FileType {
  FASTQ = "FASTQ",
  BAM = "BAM",
  VCF = "VCF",
  MAF = "MAF",
  CSV = "CSV",
  PDF = "PDF",
}

export enum FileRole {
  INPUT = "INPUT",
  OUTPUT = "OUTPUT",
  INTERMEDIATE = "INTERMEDIATE",
  FINAL_REPORT = "FINAL_REPORT",
}

export enum RunStatus {
  RUNNING = "RUNNING",
  DONE = "DONE",
  FAILED = "FAILED",
  PENDING = "PENDING",
}

export enum AccessType {
  VIEW = "VIEW",
  EDIT = "EDIT",
  ADMIN = "ADMIN",
}

export enum LicenseType {
  INDIVIDUAL = "INDIVIDUAL",
  SMALL_TEAM = "SMALL_TEAM",
  ORGANIZATION = "ORGANIZATION",
}

export enum LicenseScope {
  USER = "USER",
  ORGANIZATION = "ORGANIZATION",
}

export enum TagType {
  SAMPLE = "SAMPLE",
  CATEGORY = "CATEGORY",
  FILETYPE = "FILETYPE",
  DISEASE = "DISEASE",
  CUSTOM = "CUSTOM",
  ANALYSIS_STAGE = "ANALYSIS_STAGE",
  QUALITY_FLAG = "QUALITY_FLAG",
  PRIORITY = "PRIORITY",
}
