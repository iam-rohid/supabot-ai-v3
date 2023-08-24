import {
  FileText,
  LayoutGrid,
  LinkIcon,
  MessagesSquare,
  Palette,
  Settings,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { APP_NAME } from "@/lib/constants";
import SidebarNav, { SidebarNavProps } from "@/components/sidebar-nav";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import ChatbotSwitcher from "./chatbot-switcher";
import SideBarUserButton from "@/components/sidebar-user-button";

export default async function Layout({
  children,
  params: { chatbotSlug },
}: {
  children: ReactNode;
  params: { chatbotSlug: string };
}) {
  const { orgId } = auth();
  if (!orgId) notFound();
  const list: SidebarNavProps["list"] = [
    {
      items: [
        {
          href: `/dashboard/chatbots/${chatbotSlug}`,
          label: "Overview",
          icon: <LayoutGrid size={20} />,
          end: true,
        },
        {
          href: `/dashboard/chatbots/${chatbotSlug}/users`,
          label: "Users",
          icon: <Users size={20} />,
        },
        {
          href: `/dashboard/chatbots/${chatbotSlug}/conversations`,
          label: "Conversations",
          icon: <MessagesSquare size={20} />,
        },
      ],
    },
    {
      title: "CONTENT",
      items: [
        {
          href: `/dashboard/chatbots/${chatbotSlug}/links`,
          label: "Links",
          icon: <LinkIcon size={20} />,
        },
        {
          href: `/dashboard/chatbots/${chatbotSlug}/quick-prompts`,
          label: "Quick Prompts",
          icon: <FileText size={20} />,
        },
      ],
    },
    {
      title: "CONFIGURE",
      items: [
        {
          href: `/dashboard/chatbots/${chatbotSlug}/customization`,
          label: "Customization",
          icon: <Palette size={20} />,
        },
        {
          href: `/dashboard/chatbots/${chatbotSlug}/settings`,
          label: "Settings",
          icon: <Settings size={20} />,
        },
      ],
    },
  ];

  const chatbot = await prisma.chatbot.findUnique({
    where: { slug: chatbotSlug, organizationId: orgId },
  });

  if (!chatbot) notFound();

  const chatbots = await prisma.chatbot.findMany({
    where: { organizationId: orgId },
    select: { id: true, name: true, image: true, slug: true },
  });

  return (
    <>
      <aside className="fixed top-0 left-0 bottom-0 w-64 bg-card text-card-foreground border-r flex flex-col">
        <header className="p-4">
          <Link href="/dashboard">
            <Image
              src="/logo.svg"
              width={504}
              height={407}
              alt={`${APP_NAME} Logo`}
              className="w-12 h-12 object-contain"
            />
          </Link>
        </header>
        <div className="p-4">
          <p className="pl-4 text-xs text-muted-foreground pb-1 uppercase">
            Chatbot
          </p>
          <ChatbotSwitcher
            className="w-full"
            currentChatbot={chatbot}
            chatbots={chatbots}
          />
        </div>
        <SidebarNav list={list} />
        <div className="p-4">
          <SideBarUserButton />
        </div>
      </aside>
      <div className="ml-64">{children}</div>
    </>
  );
}
