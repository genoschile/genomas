-- CreateTable
CREATE TABLE "ProjectGroupShare" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "access" "AccessType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectGroupShare_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectGroupShare_groupId_projectId_key" ON "ProjectGroupShare"("groupId", "projectId");

-- AddForeignKey
ALTER TABLE "ProjectGroupShare" ADD CONSTRAINT "ProjectGroupShare_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectGroupShare" ADD CONSTRAINT "ProjectGroupShare_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
