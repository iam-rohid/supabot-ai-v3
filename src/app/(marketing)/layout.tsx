import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import { auth } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const { userId } = auth();
  return (
    <>
      <header className="border-b bg-card text-card-foreground">
        <div className="h-20 flex items-center container">
          <div className="flex-1">
            <Link href="/home" className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                width={504}
                height={407}
                alt={`${APP_NAME} Logo`}
                className="w-10 h-10 object-contain"
              />
              <p className="text-lg font-bold tracking-tight">SupaBot AI</p>
            </Link>
          </div>
          <nav className="flex items-center max-lg:hidden">
            <Link
              href="/about"
              className="font-medium text-sm p-4 text-muted-foreground hover:text-accent-foreground"
            >
              About
            </Link>
            <Link
              href="/home#features"
              className="font-medium text-sm p-4 text-muted-foreground hover:text-accent-foreground"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="font-medium text-sm p-4 text-muted-foreground hover:text-accent-foreground"
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="font-medium text-sm p-4 text-muted-foreground hover:text-accent-foreground"
            >
              Blog
            </Link>
          </nav>
          <div className="space-x-2 flex-1 flex items-center justify-end">
            {userId ? (
              <Button asChild>
                <Link href="/dashboard">
                  Dashboard
                  <ArrowRight className="w-4 h-4 ml-2 -mr-1" />
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link href="/signin">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">
                    Get started for free
                    <ArrowRight className="w-4 h-4 ml-2 -mr-1" />
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>
      {children}
    </>
  );
}
