import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const blogsData = await db.blogs.findMany({
    where: {
      uid: session.user.uid,
    },
  });

  return NextResponse.json({ blogsData, authenticated: true });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, content } = body;

  if (!title || !content) {
    return NextResponse.json(
      { error: "Title and content are required" },
      { status: 400 }
    );
  }

  try {
    const newBlog = await db.blogs.create({
      data: {
        title,
        content,
        uid: session.user.uid,
      },
    });

    return NextResponse.json({ newBlog, authenticated: true });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ error: "Error creating blog" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { bid, title, content, imageUrl } = body;

  if (!bid || !title || !content || !imageUrl) {
    return NextResponse.json(
      { error: "Blog ID, title and content are required" },
      { status: 400 }
    );
  }

  try {
    const updatedBlog = await db.blogs.update({
      where: { bid },
      data: {
        title,
        content,
        imageUrl,
      },
    });

    return NextResponse.json({ updatedBlog, authenticated: true });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ error: "Error updating blog" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { bid } = await req.json();

  if (!bid) {
    return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
  }

  try {
    await db.blogs.delete({
      where: { bid },
    });

    return NextResponse.json({
      message: "Blog deleted successfully",
      authenticated: true,
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Error deleting blog" }, { status: 500 });
  }
}
