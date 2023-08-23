import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const { orgId } = auth();
  if (!orgId) {
    throw redirect("/create-org");
  }
  return <>{children}</>;
}
