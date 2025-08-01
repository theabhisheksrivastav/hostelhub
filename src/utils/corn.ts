import { prisma } from "@/lib/prisma";

const usersToDelete = await prisma.user.findMany({
  where: {
    scheduledForDeletionAt: {
      lte: new Date(),
    },
  },
});

for (const user of usersToDelete) {
  await prisma.user.delete({
    where: { id: user.id },
  });
}
