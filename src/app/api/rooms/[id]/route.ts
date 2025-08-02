// app/api/rooms/[id]/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from "@/lib/auth";

function getIdFromPath(req: Request): string | undefined {
  const urlParts = new URL(req.url).pathname.split("/");
  return urlParts[urlParts.length - 1] || undefined;
}


export async function PUT(req: Request) {
  const roomId = getIdFromPath(req);
  const data = await req.json();
  const user = await getCurrentUser();

  if (!user || !user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Step 1: Check if room exists and belongs to the user
    const existingRoom = await prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!existingRoom || existingRoom.ownerId !== user.id) {
      return NextResponse.json({ error: "Room not found or access denied" }, { status: 404 });
    }

    // Step 2: Proceed with update
    const updatedRoom = await prisma.room.update({
      where: { id: roomId },
      data,
    });

    return NextResponse.json(updatedRoom);
  } catch (err) {
    console.error("Update failed:", err);
    return NextResponse.json({ error: "Failed to update room" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
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

