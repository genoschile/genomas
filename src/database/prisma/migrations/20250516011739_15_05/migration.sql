/*
  Warnings:

  - You are about to drop the `ActivePrinciple` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ActivePrincipleOnGene` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Gene` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GenomicFile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Variant` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `PipelineRun` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ActivePrincipleOnGene" DROP CONSTRAINT "ActivePrincipleOnGene_activePrincipleId_fkey";

-- DropForeignKey
ALTER TABLE "ActivePrincipleOnGene" DROP CONSTRAINT "ActivePrincipleOnGene_geneId_fkey";

-- DropForeignKey
ALTER TABLE "DocumentTag" DROP CONSTRAINT "DocumentTag_fileId_fkey";

-- DropForeignKey
ALTER TABLE "Gene" DROP CONSTRAINT "Gene_sampleId_fkey";

-- DropForeignKey
ALTER TABLE "GenomicFile" DROP CONSTRAINT "GenomicFile_inputForRunId_fkey";

-- DropForeignKey
ALTER TABLE "GenomicFile" DROP CONSTRAINT "GenomicFile_outputOfRunId_fkey";

-- DropForeignKey
ALTER TABLE "GenomicFile" DROP CONSTRAINT "GenomicFile_pipelineRunId_fkey";

-- DropForeignKey
ALTER TABLE "GenomicFile" DROP CONSTRAINT "GenomicFile_projectId_fkey";

-- DropForeignKey
ALTER TABLE "GenomicFile" DROP CONSTRAINT "GenomicFile_sampleId_fkey";

-- DropForeignKey
ALTER TABLE "Variant" DROP CONSTRAINT "Variant_geneId_fkey";

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "domain" TEXT,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "PipelineRun" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ProjectShare" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Sample" ADD COLUMN     "createdById" TEXT;

-- DropTable
DROP TABLE "ActivePrinciple";

-- DropTable
DROP TABLE "ActivePrincipleOnGene";

-- DropTable
DROP TABLE "Gene";

-- DropTable
DROP TABLE "GenomicFile";

-- DropTable
DROP TABLE "Variant";

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "fileType" "FileType" NOT NULL,
    "fileRole" "FileRole" NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projectId" TEXT NOT NULL,
    "sampleId" INTEGER,
    "pipelineRunId" TEXT,
    "inputForRunId" TEXT,
    "outputOfRunId" TEXT,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_email_key" ON "Organization"("email");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_sampleId_fkey" FOREIGN KEY ("sampleId") REFERENCES "Sample"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_pipelineRunId_fkey" FOREIGN KEY ("pipelineRunId") REFERENCES "PipelineRun"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_inputForRunId_fkey" FOREIGN KEY ("inputForRunId") REFERENCES "PipelineRun"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_outputOfRunId_fkey" FOREIGN KEY ("outputOfRunId") REFERENCES "PipelineRun"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PipelineRun" ADD CONSTRAINT "PipelineRun_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sample" ADD CONSTRAINT "Sample_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentTag" ADD CONSTRAINT "DocumentTag_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
