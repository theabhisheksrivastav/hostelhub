import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Welcome, {session.user.name}</h1>
      <p className="text-gray-600">This is your dashboard.</p>
    </main>
  );
}
