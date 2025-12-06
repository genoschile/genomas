import prisma from "@/lib/actions/prisma";

const main = async () => {
 console.log("Seeding database...");
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
