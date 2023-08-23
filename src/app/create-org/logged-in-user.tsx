"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  UserButton,
  useAuth,
  useSession,
  useSessionList,
  useUser,
} from "@clerk/nextjs";
import { Check, LogOut, UserPlus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function LoggedInUser() {
  const { isLoaded, user } = useUser();
  const { sessions, isLoaded: sessionsLoaded, setActive } = useSessionList();
  const { isLoaded: authLoaded, signOut, sessionId } = useAuth();
  if (!isLoaded || !authLoaded || !sessionsLoaded) {
    return <Skeleton className="W-32 h-20" />;
  }
  if (!user) {
    return null;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="h-fit p-3 text-left justify-start flex-col items-start"
          variant="ghost"
        >
          <p className="text-sm text-muted-foreground font-normal">
            Logged in as:
          </p>
          <p className="text-base font-medium">
            {user.primaryEmailAddress?.emailAddress}
          </p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {sessions.map((session) => (
          <DropdownMenuItem
            key={session.id}
            onClick={() =>
              setActive({
                session: session.id,
              })
            }
          >
            <div className="flex-1 truncate">
              {session.user?.primaryEmailAddress?.emailAddress}
            </div>
            <Check
              className={cn("w-4 h-4 ml-2 opacity-0", {
                "opacity-100": session.id === sessionId,
              })}
            />
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/signin">
            <UserPlus className="w-4 h-4 mr-2" />
            Add account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="w-4 h-4 mr-2" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
