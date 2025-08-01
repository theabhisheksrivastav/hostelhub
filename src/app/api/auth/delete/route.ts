import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

type Params = { params: { id: string } };

export async function DELETE(req: Request, { params }: Params) {
  const user = await getCurrentUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      scheduledForDeletionAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  return new Response("User scheduled for deletion", { status: 200 });
}
