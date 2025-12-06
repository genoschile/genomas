/*
  Warnings:

  - The primary key for the `DocumentTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `documentId` on the `DocumentTag` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Sample` table. All the data in the column will be lost.
  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `permissions` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Document` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SampleDocument` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserWorkplace` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Workplace` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fileId` to the `DocumentTag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('OWNER', 'ADMIN', 'EDITOR', 'VIEWER');

-- CreateEnum
CREATE TYPE "PipelineType" AS ENUM ('CANCER', 'GERMLINE', 'BACTERIA');

-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('FASTQ', 'BAM', 'VCF', 'MAF', 'CSV', 'PDF');

-- CreateEnum
CREATE TYPE "FileRole" AS ENUM ('INPUT', 'OUTPUT', 'INTERMEDIATE', 'FINAL_REPORT');

-- CreateEnum
CREATE TYPE "RunStatus" AS ENUM ('RUNNING', 'DONE', 'FAILED', 'PENDING');

-- CreateEnum
CREATE TYPE "AccessType" AS ENUM ('VIEW', 'EDIT', 'ADMIN');

-- CreateEnum
CREATE TYPE "LicenseType" AS ENUM ('INDIVIDUAL', 'SMALL_TEAM', 'ORGANIZATION');

-- CreateEnum
CREATE TYPE "LicenseScope" AS ENUM ('USER', 'ORGANIZATION');

-- CreateEnum
CREATE TYPE "TagType" AS ENUM ('SAMPLE', 'CATEGORY', 'FILETYPE', 'DISEASE', 'CUSTOM', 'ANALYSIS_STAGE', 'QUALITY_FLAG', 'PRIORITY');

-- DropForeignKey
ALTER TABLE "DocumentTag" DROP CONSTRAINT "DocumentTag_documentId_fkey";

-- DropForeignKey
ALTER TABLE "DocumentTag" DROP CONSTRAINT "DocumentTag_tagId_fkey";

-- DropForeignKey
ALTER TABLE "Sample" DROP CONSTRAINT "Sample_userId_fkey";

-- DropForeignKey
ALTER TABLE "SampleDocument" DROP CONSTRAINT "SampleDocument_documentId_fkey";

-- DropForeignKey
ALTER TABLE "SampleDocument" DROP CONSTRAINT "SampleDocument_sampleId_fkey";

-- DropForeignKey
ALTER TABLE "UserWorkplace" DROP CONSTRAINT "UserWorkplace_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserWorkplace" DROP CONSTRAINT "UserWorkplace_workplaceId_fkey";

-- AlterTable
ALTER TABLE "DocumentTag" DROP CONSTRAINT "DocumentTag_pkey",
DROP COLUMN "documentId",
ADD COLUMN     "fileId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "tagId" SET DATA TYPE TEXT,
ADD CONSTRAINT "DocumentTag_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "DocumentTag_id_seq";

-- AlterTable
ALTER TABLE "Sample" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_pkey",
ADD COLUMN     "type" "TagType" NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Tag_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Tag_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "permissions",
ADD COLUMN     "groupId" TEXT,
ADD COLUMN     "organizationId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "name" DROP NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- DropTable
DROP TABLE "Document";

-- DropTable
DROP TABLE "SampleDocument";

-- DropTable
DROP TABLE "UserWorkplace";

-- DropTable
DROP TABLE "Workplace";

-- DropEnum
DROP TYPE "DocumentType";

-- CreateTable
CREATE TABLE "License" (
    "id" TEXT NOT NULL,
    "licenseType" "LicenseType" NOT NULL,
    "licenseScope" "LicenseScope" NOT NULL,
    "maxUsers" INTEGER NOT NULL,
    "assignedUsers" INTEGER NOT NULL DEFAULT 0,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT,
    "organizationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "License_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workspace" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pipelineType" "PipelineType" NOT NULL,
    "organizationId" TEXT,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkspaceMember" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "WorkspaceMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "workspaceId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectShare" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "access" "AccessType" NOT NULL,

    CONSTRAINT "ProjectShare_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GenomicFile" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "fileType" "FileType" NOT NULL,
    "fileRole" "FileRole" NOT NULL,
    "projectId" TEXT NOT NULL,
    "sampleId" INTEGER,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pipelineRunId" TEXT,
    "inputForRunId" TEXT,
    "outputOfRunId" TEXT,

    CONSTRAINT "GenomicFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PipelineRun" (
    "id" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "endedAt" TIMESTAMP(3),
    "status" "RunStatus" NOT NULL,
    "workflow" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "PipelineRun_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "License_userId_key" ON "License"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "License_organizationId_key" ON "License"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkspaceMember_userId_workspaceId_key" ON "WorkspaceMember"("userId", "workspaceId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectShare_userId_projectId_key" ON "ProjectShare"("userId", "projectId");

-- AddForeignKey
ALTER TABLE "License" ADD CONSTRAINT "License_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "License" ADD CONSTRAINT "License_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkspaceMember" ADD CONSTRAINT "WorkspaceMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkspaceMember" ADD CONSTRAINT "WorkspaceMember_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectShare" ADD CONSTRAINT "ProjectShare_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectShare" ADD CONSTRAINT "ProjectShare_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenomicFile" ADD CONSTRAINT "GenomicFile_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenomicFile" ADD CONSTRAINT "GenomicFile_sampleId_fkey" FOREIGN KEY ("sampleId") REFERENCES "Sample"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenomicFile" ADD CONSTRAINT "GenomicFile_pipelineRunId_fkey" FOREIGN KEY ("pipelineRunId") REFERENCES "PipelineRun"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenomicFile" ADD CONSTRAINT "GenomicFile_inputForRunId_fkey" FOREIGN KEY ("inputForRunId") REFERENCES "PipelineRun"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenomicFile" ADD CONSTRAINT "GenomicFile_outputOfRunId_fkey" FOREIGN KEY ("outputOfRunId") REFERENCES "PipelineRun"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PipelineRun" ADD CONSTRAINT "PipelineRun_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentTag" ADD CONSTRAINT "DocumentTag_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "GenomicFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentTag" ADD CONSTRAINT "DocumentTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
