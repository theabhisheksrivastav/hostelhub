import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

// ✅ GET: Unassigned Employees with search & pagination
export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const search = searchParams.get("search")?.trim() || "";
  const offset = (page - 1) * limit;

  const whereClause = {
    userId: user.id,
    roomId: null,
    ...(search && {
      OR: [
        { firstName: { contains: search, mode: "insensitive" } },
        { lastName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ],
    }),
  };

  try {
    const [employees, total] = await Promise.all([
      prisma.employee.findMany({
        where: whereClause,
        skip: offset,
        take: limit,
        orderBy: { firstName: "asc" },
      }),
      prisma.employee.count({ where: whereClause }),
    ]);

    return NextResponse.json({
      data: employees,
      meta: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
        limit,
      },
    });
  } catch (error) {
    console.error("Error fetching unassigned employees:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ✅ POST: Assign occupants to a room
export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { roomId, employeeIds } = await req.json();

  if (!roomId || !Array.isArray(employeeIds)) {
    return NextResponse.json({ error: "roomId and employeeIds are required" }, { status: 400 });
  }

  try {
    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: { occupants: true },
    });

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    const currentCount = room.occupants.length;
    const capacity = room.capacity ?? 0;
    const newCount = employeeIds.length;

    if (currentCount + newCount > capacity) {
      return NextResponse.json({
        error: `Room capacity exceeded. Current occupants: ${currentCount}, Capacity: ${capacity}, Trying to add: ${newCount}`
      }, { status: 400 });
    }

    // ✅ Assign employees to room
    const updatedRoom = await prisma.room.update({
      where: { id: roomId },
      data: {
        occupants: {
          connect: employeeIds.map((id: string) => ({ id })),
        },
      },
      include: { occupants: true },
    });

    // ✅ Update employee.roomId
    await prisma.employee.updateMany({
      where: { id: { in: employeeIds } },
      data: { roomId },
    });

    return NextResponse.json(updatedRoom);
  } catch (error) {
    console.error("Error assigning occupants:", error);
    return NextResponse.json({ error: "Failed to assign occupants" }, { status: 500 });
  }
}


// ✅ DELETE: Remove occupants from room
export async function DELETE(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { roomId, employeeIds } = await req.json();

  if (!roomId || !Array.isArray(employeeIds)) {
    return NextResponse.json({ error: "roomId and employeeIds are required" }, { status: 400 });
  }

  try {
    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: { occupants: true },
    });

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    const occupantsToRemove = employeeIds.filter((id: string) =>
      room.occupants.some((o) => o.id === id)
    );

    if (occupantsToRemove.length === 0) {
      return NextResponse.json({ error: "None of the users are occupants" }, { status: 400 });
    }

    // ✅ Disconnect employees from room
    const updatedRoom = await prisma.room.update({
      where: { id: roomId },
      data: {
        occupants: {
          disconnect: occupantsToRemove.map((id: string) => ({ id })),
        },
      },
      include: { occupants: true },
    });

    // ✅ Update employee.roomId to null
    await prisma.employee.updateMany({
      where: { id: { in: occupantsToRemove } },
      data: { roomId: null },
    });

    return NextResponse.json(updatedRoom);
  } catch (error) {
    console.error("Error removing occupants:", error);
    return NextResponse.json({ error: "Failed to remove occupants" }, { status: 500 });
  }
}
