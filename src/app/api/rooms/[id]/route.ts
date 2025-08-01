// app/api/rooms/[id]/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from "@/lib/auth";

function getIdFromPath(req: Request): string | null {
  const urlParts = new URL(req.url).pathname.split("/");
  return urlParts[urlParts.length - 1] || null;
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const roomId = getIdFromPath(req);
 

  const data = await req.json();
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const updated = await prisma.room.update({
      where: { id: roomId, userId: user.id, },
      data,
    });

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update room' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
   const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = getIdFromPath(req);
  if (!id) return NextResponse.json({ error: "ID not found in path" }, { status: 400 });


  try {
    await prisma.room.delete({ where: { id, ownerId: user.id, } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to delete room' }, { status: 500 });
  }
}

