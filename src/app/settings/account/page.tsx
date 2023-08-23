import { Button } from "@/components/ui/button";
import { UserProfile } from "@clerk/nextjs";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function AccountPage() {
  return (
    <>
      <header className="flex items-center justify-between p-8">
        <Button asChild variant="outline">
          <Link href="/dashboard">
            <ChevronLeft className="w-4 h-4 mr-2 -ml-1" />
            Back to Dashboard
          </Link>
        </Button>
      </header>
      <div className="w-fit mx-auto py-8">
        <UserProfile />
      </div>
    </>
  );
}
