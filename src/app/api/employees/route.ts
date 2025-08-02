import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, mobile } = body;
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existing = await prisma.employee.findFirst({ where: { email } });
    if (existing) return NextResponse.json({ error: "Employee with email already exists" }, { status: 400 });


    const employee = await prisma.employee.create({
      data: {
        firstName,
        lastName,
        email,
        mobile,
        employee_of: {
          connect: { id: user.id },
        },
      },
    });

    return NextResponse.json({ message: "Employee created", employee });
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to create employee" }, { status: 500 });
  }
}
export async function GET(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const search = searchParams.get("search") || "";

  const offset = (page - 1) * limit;

  const searchTerms = search.trim().split(/\s+/);

  const searchConditions =
    searchTerms.length === 1
      ? [
          { firstName: { contains: search, mode: Prisma.QueryMode.insensitive} },
          { lastName: { contains: search, mode: Prisma.QueryMode.insensitive} },
          { email: { contains: search, mode: Prisma.QueryMode.insensitive} },
        ]
      : [
          {
            AND: [
              { firstName: { contains: searchTerms[0], mode: Prisma.QueryMode.insensitive} },
              { lastName: { contains: searchTerms[1], mode: Prisma.QueryMode.insensitive} },
            ],
          },
          { email: { contains: search, mode: Prisma.QueryMode.insensitive} },
        ];

  try {
    const [employees, total] = await Promise.all([
      prisma.employee.findMany({
        where: {
          userId: user.id,
          OR: search ? searchConditions : undefined,
        },
        skip: offset,
        take: limit,
        orderBy: {
          firstName: "asc",
        },
      }),
      prisma.employee.count({
        where: {
          userId: user.id,
          OR: search ? searchConditions : undefined,
        },
      }),
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
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch employees" }, { status: 500 });
  }
}
