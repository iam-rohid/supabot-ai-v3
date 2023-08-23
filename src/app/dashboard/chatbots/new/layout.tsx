import { APP_NAME } from "@/lib/constants";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="border-b bg-card text-card-foreground">
        <div className="container h-20 flex items-center gap-6">
          <Link href="/dashboard">
            <Image
              src="/logo.svg"
              width={504}
              height={407}
              alt={`${APP_NAME} Logo`}
              className="w-12 h-12 object-contain"
            />
          </Link>
          <OrganizationSwitcher
            appearance={{
              elements: {
                rootBox: { display: "flex" },
              },
            }}
            hidePersonal
          />
          <div className="flex-1"></div>
          <UserButton />
        </div>
      </header>
      {children}
    </>
  );
}
