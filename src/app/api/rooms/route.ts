// app/api/rooms/route.ts (or /rooms/create/route.ts)
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';

  


export async function POST(req: Request) {
  const data = await req.json();
  const { name, hostelId, capacity } = data;
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });


  try {
    const room = await prisma.room.create({
      data: {
        name, capacity, owner: {
          connect: { id: user.id },
        }, hostel: {
          connect: { id: hostelId }

        },
      },
    });

    return NextResponse.json(room);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create room' }, { status: 500 });
  }
}

export async function GET(req: Request ) {
  const { searchParams } = new URL(req.url);
  const hostelId = searchParams.get('hostelId');


  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const rooms = await prisma.room.findMany({
      where: { hostelId: hostelId, ownerId: user.id, },
      include: { occupants: true, hostel: true },
    });
    return NextResponse.json(rooms);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch rooms' }, { status: 500 });
  }
}

