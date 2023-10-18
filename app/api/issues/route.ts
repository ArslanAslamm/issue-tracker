import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";
const createIssueSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(255),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(255),
});
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }
    const newIssue = await prisma.issue.create({
      data: { title: body.title, description: body.description },
    });

    return NextResponse.json(newIssue, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 402 });
  }
}
