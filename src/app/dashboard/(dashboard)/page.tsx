import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { UserButton, auth } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  LayoutGrid,
  LayoutList,
  MoreHorizontal,
  Plus,
  Search,
} from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function Page({
  searchParams: { view },
}: {
  searchParams: { view: string };
}) {
  const { orgId } = auth();
  if (!orgId) notFound();

  const chatbots = await prisma.chatbot.findMany({
    where: { organizationId: orgId },
  });

  return (
    <Tabs value={new Set(["grid", "list"]).has(view) ? view : "grid"}>
      <main className="container py-8 space-y-8">
        <header className="py-4 flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-semibold">Chatbots</h1>
          </div>
        </header>

        <div className="flex items-center gap-6">
          <form className="flex-1 relative">
            <Input
              type="text"
              placeholder="Search..."
              className="flex-1 pl-10"
            />
            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
          </form>
          <TabsList>
            <TabsTrigger value="grid" asChild>
              <Link
                href={{
                  pathname: "/dashboard",
                  search: new URLSearchParams({ view: "grid" }).toString(),
                }}
              >
                <LayoutGrid size={20} />
              </Link>
            </TabsTrigger>
            <TabsTrigger value="list" asChild>
              <Link
                href={{
                  pathname: "/dashboard",
                  search: new URLSearchParams({ view: "list" }).toString(),
                }}
              >
                <LayoutList size={20} />
              </Link>
            </TabsTrigger>
          </TabsList>
          <Button asChild>
            <Link href="/dashboard/chatbots/new">
              <Plus size={20} className="mr-2 -ml-1" />
              Create Chatbot
            </Link>
          </Button>
        </div>
        <TabsContent value="grid">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chatbots.map((chatbot) => (
              <Link
                key={chatbot.id}
                href={`/dashboard/chatbots/${chatbot.slug}`}
                className="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-all p-4 gap-4 flex flex-col"
              >
                <div className="flex gap-4 items-center">
                  <Avatar className="w-10 h-10">
                    {chatbot.image && <AvatarImage src={chatbot.image} />}
                    <AvatarFallback>
                      <Image
                        src={`/api/avatar?seed=${chatbot.id}&initials=${chatbot.slug}&size=128`}
                        width={128}
                        height={128}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium">{chatbot.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {chatbot.slug}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Last updated{" "}
                  {formatDistanceToNow(new Date(chatbot.updatedAt), {
                    addSuffix: true,
                  })}
                </p>
              </Link>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="list">
          <div className="grid gap-6">
            {chatbots.map((chatbot) => (
              <Link
                key={chatbot.id}
                href={`/dashboard/chatbots/${chatbot.slug}`}
                className="rounded-lg border bg-card text-card-foreground transition-all flex md:items-center hover:shadow-lg shadow-sm p-4 gap-4"
              >
                <div className="flex-1 flex gap-4 max-md:flex-col md:items-center">
                  <div className="flex items-center gap-4 flex-1">
                    <Avatar className="w-10 h-10">
                      {chatbot.image && <AvatarImage src={chatbot.image} />}
                      <AvatarFallback>
                        <Image
                          src={`/api/avatar?seed=${chatbot.id}&initials=${chatbot.slug}&size=128`}
                          width={128}
                          height={128}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden flex flex-col">
                      <h3 className="font-medium truncate">{chatbot.name}</h3>
                      <p className="text-sm text-muted-foreground truncate flex-1">
                        {chatbot.slug}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Last updated{" "}
                      {formatDistanceToNow(new Date(chatbot.updatedAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/dashboard/chatbots/${chatbot.slug}/conversations`}
                        >
                          Conversations
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/dashboard/chatbots/${chatbot.slug}/links`}
                        >
                          Add Link
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/dashboard/chatbots/${chatbot.slug}/settings`}
                        >
                          Settings
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </Link>
            ))}
          </div>
        </TabsContent>
      </main>
    </Tabs>
  );
}
