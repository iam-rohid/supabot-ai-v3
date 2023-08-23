import { prisma } from "@/lib/prisma";
import { createChatbotValidator } from "@/lib/validators";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { orgId, userId } = auth();
  if (!userId) {
    return new Response("Unauthenticated", { status: 400 });
  }

  if (!orgId) {
    throw NextResponse.redirect("/create-org");
  }

  const { name, slug } = createChatbotValidator.parse(await req.json());

  const alreadyExists = await prisma.chatbot.findUnique({
    where: { slug },
    select: { slug: true },
  });
  if (alreadyExists) {
    return new Response("Slug already in use!", { status: 400 });
  }

  const chatbot = await prisma.chatbot.create({
    data: {
      name,
      slug,
      organizationId: orgId,
    },
  });
  return NextResponse.json(chatbot);
};
