import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { bid: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { bid } = params;

  if (!bid) {
    return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
  }

  try {
    const blog = await db.blogs.findUnique({
      where: { bid: parseInt(bid) },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ blogData: blog, authenticated: true });
  } catch (error) {
    console.error("Error fetching blog details:", error);
    return NextResponse.json(
      { error: "Error fetching blog details" },
      { status: 500 }
    );
  }
}
