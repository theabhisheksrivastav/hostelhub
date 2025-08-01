import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { verifyOwnership } from "@/lib/permissions";
import { connect } from "http2";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const hostels = await prisma.hostel.findMany({
    where: { ownerId: user.id },
  });

  return NextResponse.json(hostels);
}

export async function POST(req: Request) {
  const { name, location } = await req.json();
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });


  if (!name || !location) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const hostel = await prisma.hostel.create({
    data: {
      name, location, owner: {
        connect: { id: user.id },
      },
    },
  });

  return NextResponse.json(hostel);
}
