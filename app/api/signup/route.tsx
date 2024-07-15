import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    console.log("Request received:", req.method, req.url);

    const res = await req.json();
    console.log("Request body:", res);

    const { name, email, password } = res;

    if (!name || !email || !password) {
      console.log("Validation error: Name, email, and password are required");
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Password validation
    const errors = [];
    if (password.length < 8) {
      errors.push("at least 8 characters long");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("one lowercase letter");
    }
    if (!/\d/.test(password)) {
      errors.push("one number");
    }
    if (!/[@$!%*?&]/.test(password)) {
      errors.push("one special character");
    }

    if (errors.length > 0) {
      console.log("Validation error: Password requirements not met");
      return NextResponse.json(
        { error: `Password must include ${errors.join(", ")}` },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      console.log("User with email already exists:", email);
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }

    const result = await db.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    console.log("User created successfully:", result);
    return NextResponse.json(
      { message: "User created successfully", result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
