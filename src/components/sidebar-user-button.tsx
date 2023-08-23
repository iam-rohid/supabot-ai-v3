"use client";
import { useAuth, useSession, useUser } from "@clerk/nextjs";
import { Skeleton } from "./ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronsUpDown, Home, LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

export default function SideBarUserButton() {
  const { isLoaded, user } = useUser();
  const { isLoaded: sessionLoaded, session: activeSession } = useSession();
  const { signOut } = useAuth();

  if (!(isLoaded && user && sessionLoaded)) {
    return <Skeleton className="w-full h-[50px]" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="text-left gap-2 justify-start w-full h-fit p-2"
          variant="outline"
        >
          <Avatar className="w-8 h-8">
            {user.imageUrl && <AvatarImage src={user.imageUrl} />}
            <AvatarFallback>
              <User size={20} />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden flex flex-col">
            <p className="font-medium truncate leading-4">
              {user.fullName || user.primaryEmailAddress?.emailAddress}
            </p>
            <p className="text-sm text-muted-foreground truncate leading-4 font-normal">
              {user.primaryEmailAddress?.emailAddress}
            </p>
          </div>
          <ChevronsUpDown className="w-4 h-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/settings/account">
              <User className="mr-2 w-4 h-4" />
              View Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings/account#/profile">
              <Settings className="mr-2 w-4 h-4" />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/home">
            <Home className="mr-2 w-4 h-4" />
            Home Page
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut({ sessionId: activeSession?.id })}
        >
          <LogOut className="mr-2 w-4 h-4" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
