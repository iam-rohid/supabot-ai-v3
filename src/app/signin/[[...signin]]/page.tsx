import { Button } from "@/components/ui/button";
import { SignIn, auth } from "@clerk/nextjs";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const { userId } = auth();
  return (
    <>
      <header className="flex items-center justify-between p-8">
        <Button asChild variant="outline">
          <Link href={userId ? "/dashboard" : "/home"}>
            <ChevronLeft className="w-4 h-4 mr-2 -ml-1" />
            Back to {userId ? "Dashboard" : "Home"}
          </Link>
        </Button>
      </header>
      <div className="w-fit mx-auto py-8">
        <SignIn />
      </div>
    </>
  );
}
