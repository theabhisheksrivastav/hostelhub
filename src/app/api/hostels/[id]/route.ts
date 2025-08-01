import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

  


function getIdFromPath(req: Request): string | null {
  const urlParts = new URL(req.url).pathname.split("/");
  return urlParts[urlParts.length - 1] || null;
}


export async function PUT(req: Request ) {
  const { name, location } = await req.json();
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = getIdFromPath(req);
  if (!id) return NextResponse.json({ error: "ID not found in path" }, { status: 400 });



  const updated = await prisma.hostel.update({
    where: { id, ownerId: user.id, },
    data: { name, location },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: Request ) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = getIdFromPath(req);
  if (!id) return NextResponse.json({ error: "ID not found in path" }, { status: 400 });


  await prisma.hostel.delete({
    where: { id, ownerId: user.id, },
  });

  return NextResponse.json({ message: "Hostel deleted" });
}

export async function  GET(req: Request ) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = getIdFromPath(req);
  if (!id) return NextResponse.json({ error: "ID not found in path" }, { status: 400 });

  const hostel = await prisma.hostel.findUnique({ where: { id, ownerId: user.id, }, include : {rooms: { include: { occupants: true }}}, });

  return NextResponse.json(hostel)
}