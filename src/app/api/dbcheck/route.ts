// app/api/dbcheck/route.ts
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const result = await prisma.user.findFirst();
    return new Response("DB Connected");
  } catch (e) {
    return new Response(`Error: ${e}`, { status: 500 });
  }
}
