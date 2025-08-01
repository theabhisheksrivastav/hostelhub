import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

  

function getIdFromPath(req: Request): string | null {
  const urlParts = new URL(req.url).pathname.split("/");
  return urlParts[urlParts.length - 1] || null;
}

export async function PUT(req: Request ) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  const { email, ...rest } = data;

  const id = getIdFromPath(req);
  if (!id) return NextResponse.json({ error: "ID not found in path" }, { status: 400 });

  // Check if the email is already taken by another employee
  if (email) {
    const existing = await prisma.employee.findUnique({ where: { email } });

    if (existing && existing.id !== id && existing.userId !== user.id) {
      return NextResponse.json(
        { error: "Email is already in use by another employee" },
        { status: 400 }
      );
    }
  }

  try {
    const updated = await prisma.employee.update({
      where: {
        id,
        userId: user.id, // Ensure employee belongs to current user
      },
      data: {
        ...rest,
        ...(email && { email }),
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Failed to update employee" }, { status: 500 });
  }
}

export async function DELETE(req: Request ) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = getIdFromPath(req);
  if (!id) return NextResponse.json({ error: "ID not found in path" }, { status: 400 });


  try {
    const deleted = await prisma.employee.delete({
      where: {
        id,
        userId: user.id,
      },
    });


    return NextResponse.json({ message: "Employee deleted" });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete employee" }, { status: 500 });
  }
}

export async function GET(req: Request ) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = getIdFromPath(req);
  if (!id) return NextResponse.json({ error: "ID not found in path" }, { status: 400 });


  const employee = await prisma.employee.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!employee) {
    return NextResponse.json({ error: "Employee not found" }, { status: 404 });
  }

  return NextResponse.json(employee);
}
