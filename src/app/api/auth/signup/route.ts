import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { firstName, lastName, email, password, mobile } = body;

//     const existing = await prisma.user.findUnique({ where: { email } });
//     if (existing) return NextResponse.json({ error: "User already exists" }, { status: 400 });

//     const hashed = await bcrypt.hash(password, 10);

//     const user = await prisma.user.create({
//       data: {
//         firstName,
//         lastName,
//         email,
//         password: hashed,
//         mobile,
//       },
//     });

//     return NextResponse.json({ message: "User created", user });
//   } catch (err) {
//     return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
//   }
// }

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password, mobile } = body;


    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashed,
        mobile,
      },
    });

    return NextResponse.json({ message: "User created", user });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
