/*
  Warnings:

  - You are about to drop the column `format` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - Added the required column `docType` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `encryptedData` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `encryptedPassword` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InputSource" AS ENUM ('SOMATIC', 'GERMINAL', 'LIQUID_BIOPSY', 'CLINICAL');

-- CreateEnum
CREATE TYPE "SequenceType" AS ENUM ('WHOLE_GENOME', 'WHOLE_EXOME', 'GENOMIC_PANEL');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADMIN', 'CLIENT');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('VCF', 'MAF', 'REPORT', 'CLINICO');

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_userId_fkey";

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "format",
DROP COLUMN "path",
DROP COLUMN "title",
DROP COLUMN "userId",
ADD COLUMN     "docType" "DocumentType" NOT NULL,
ADD COLUMN     "encryptedData" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ADD COLUMN     "encryptedPassword" TEXT NOT NULL,
ADD COLUMN     "permissions" TEXT[],
ADD COLUMN     "userType" "UserType" NOT NULL DEFAULT 'CLIENT';

-- CreateTable
CREATE TABLE "Workplace" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "permissions" TEXT[],

    CONSTRAINT "Workplace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserWorkplace" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "workplaceId" INTEGER NOT NULL,

    CONSTRAINT "UserWorkplace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sample" (
    "id" SERIAL NOT NULL,
    "sampleName" TEXT NOT NULL,
    "reportDate" TIMESTAMP(3) NOT NULL,
    "sampleType" "InputSource" NOT NULL,
    "sequencingType" "SequenceType" NOT NULL,
    "disease" TEXT NOT NULL,
    "folioNumber" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sample_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gene" (
    "id" SERIAL NOT NULL,
    "types" TEXT[],
    "impacts" TEXT[],
    "significances" TEXT[],
    "description" TEXT NOT NULL,
    "sampleId" INTEGER NOT NULL,

    CONSTRAINT "Gene_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Variant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "geneId" INTEGER NOT NULL,

    CONSTRAINT "Variant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivePrinciple" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "availabilityInChile" BOOLEAN NOT NULL,
    "enterprise" TEXT,
    "pharmaceutical" TEXT,

    CONSTRAINT "ActivePrinciple_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivePrincipleOnGene" (
    "id" SERIAL NOT NULL,
    "geneId" INTEGER NOT NULL,
    "activePrincipleId" INTEGER NOT NULL,

    CONSTRAINT "ActivePrincipleOnGene_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SampleDocument" (
    "id" SERIAL NOT NULL,
    "sampleId" INTEGER NOT NULL,
    "documentId" INTEGER NOT NULL,

    CONSTRAINT "SampleDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentTag" (
    "id" SERIAL NOT NULL,
    "documentId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "DocumentTag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserWorkplace" ADD CONSTRAINT "UserWorkplace_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWorkplace" ADD CONSTRAINT "UserWorkplace_workplaceId_fkey" FOREIGN KEY ("workplaceId") REFERENCES "Workplace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sample" ADD CONSTRAINT "Sample_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gene" ADD CONSTRAINT "Gene_sampleId_fkey" FOREIGN KEY ("sampleId") REFERENCES "Sample"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_geneId_fkey" FOREIGN KEY ("geneId") REFERENCES "Gene"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivePrincipleOnGene" ADD CONSTRAINT "ActivePrincipleOnGene_geneId_fkey" FOREIGN KEY ("geneId") REFERENCES "Gene"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivePrincipleOnGene" ADD CONSTRAINT "ActivePrincipleOnGene_activePrincipleId_fkey" FOREIGN KEY ("activePrincipleId") REFERENCES "ActivePrinciple"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SampleDocument" ADD CONSTRAINT "SampleDocument_sampleId_fkey" FOREIGN KEY ("sampleId") REFERENCES "Sample"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SampleDocument" ADD CONSTRAINT "SampleDocument_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentTag" ADD CONSTRAINT "DocumentTag_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentTag" ADD CONSTRAINT "DocumentTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
