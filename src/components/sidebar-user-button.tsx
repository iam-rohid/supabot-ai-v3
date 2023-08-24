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
import {
  ChevronsUpDown,
  Computer,
  ExternalLink,
  Home,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { ReactNode } from "react";
import { Label } from "./ui/label";
import { APP_NAME } from "@/lib/constants";

const themes: Record<string, { label: string; icon: ReactNode }> = {
  system: {
    label: "System",
    icon: <Computer size={16} />,
  },
  light: {
    label: "Light",
    icon: <Computer size={16} />,
  },
  dark: {
    label: "Dark",
    icon: <Computer size={16} />,
  },
};

export default function SideBarUserButton() {
  const { isLoaded, user } = useUser();
  const { isLoaded: sessionLoaded, session: activeSession } = useSession();
  const { signOut } = useAuth();
  const { theme, setTheme } = useTheme();

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
        <div className="p-2">
          <p className="font-medium">{user.fullName}</p>
          <p className="text-sm text-muted-foreground">
            {user.primaryEmailAddress?.emailAddress}
          </p>
        </div>

        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/settings/account">Settings</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <div className="flex items-center justify-between gap-2 py-1 pl-2">
          <Label htmlFor="theme-switcher" className="flex-1 truncate">
            Theme
          </Label>
          <Select value={theme} onValueChange={(value) => setTheme(value)}>
            <SelectTrigger id="theme-switcher" className="w-fit gap-2">
              {theme && (
                <>
                  {themes[theme].icon}
                  {themes[theme].label}
                </>
              )}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/home" target="_blank">
            <p className="flex-1 truncate">{APP_NAME} Homepage</p>
            <ExternalLink size={16} />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => signOut({ sessionId: activeSession?.id })}
        >
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
