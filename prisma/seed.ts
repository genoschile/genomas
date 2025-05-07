import prisma from "@/lib/actions/prisma";

const main = async () => {
  const org = await prisma.organization.create({
    data: {
      name: "Genomics Inc",
    },
  });

  await prisma.license.create({
    data: {
      licenseType: "SMALL_TEAM",
      licenseScope: "ORGANIZATION",
      maxUsers: 5,
      startDate: new Date(),
      endDate: new Date(),
      organization: { connect: { id: org.id } },
    },
  });

  const user = await prisma.user.create({
    data: {
      email: "ana@genomics.com",
      encryptedPassword: "secreta123",
      organizationId: org.id,
    },
  });

  const workspace = await prisma.workspace.create({
    data: {
      name: "Cancer Research",
      pipelineType: "CANCER",
      ownerId: user.id,
      organizationId: org.id,
    },
  });

  await prisma.workspaceMember.create({
    data: {
      userId: user.id,
      workspaceId: workspace.id,
      role: "ADMIN",
    },
  });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
