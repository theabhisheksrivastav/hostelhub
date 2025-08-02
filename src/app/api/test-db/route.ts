// /app/api/test-db/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    await prisma.user.findFirst();
    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("DB Test Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
