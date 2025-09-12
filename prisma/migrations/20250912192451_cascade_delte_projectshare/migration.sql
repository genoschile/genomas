-- DropForeignKey
ALTER TABLE "ProjectGroupShare" DROP CONSTRAINT "ProjectGroupShare_projectId_fkey";

-- AddForeignKey
ALTER TABLE "ProjectGroupShare" ADD CONSTRAINT "ProjectGroupShare_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
