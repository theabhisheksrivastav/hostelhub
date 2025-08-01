// lib/auth.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;

  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    firstName: session.user.name?.split(" ")[0] || "User",
  };
}
