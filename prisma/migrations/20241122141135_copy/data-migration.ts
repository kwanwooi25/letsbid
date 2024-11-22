import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async (tx) => {
    const auctionCases = await tx.auctionCase.findMany();
    for (const auctionCase of auctionCases) {
      await tx.auctionCase.update({
        where: { id: auctionCase.id },
        data: {
          images: auctionCase.image ? [auctionCase.image] : [],
        },
      });
    }
  });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
