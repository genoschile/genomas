/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Workspace` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `WorkspaceMember` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Workspace" DROP CONSTRAINT "Workspace_ownerId_fkey";

-- AlterTable
ALTER TABLE "Workspace" DROP COLUMN "ownerId";

-- AlterTable
ALTER TABLE "WorkspaceMember" ADD COLUMN     "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

ALTER TABLE "Workspace" ADD COLUMN "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
