import { CreateOrganization } from "@clerk/nextjs";
import LoggedInUser from "./logged-in-user";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import { ChevronLeft } from "lucide-react";

export default function CreateOrgPage() {
  return (
    <>
      <header className="flex items-center justify-between p-8">
        <Button asChild variant="outline">
          <Link href="/dashboard">
            <ChevronLeft className="w-4 h-4 mr-2 -ml-1" />
            Back to Dashboard
          </Link>
        </Button>
        <div className="flex-1"></div>
        <LoggedInUser />
      </header>
      <div className="mx-auto w-fit py-16">
        <CreateOrganization />
      </div>
    </>
  );
}
