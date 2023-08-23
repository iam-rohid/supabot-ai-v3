import { APP_NAME } from "@/lib/constants";
import { CreditCard, LayoutGrid, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import OrganizationSwitcher from "./organization-switcher";
import SidebarNav from "@/components/sidebar-nav";
import SideBarUserButton from "@/components/sidebar-user-button";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <aside className="fixed top-0 left-0 bottom-0 w-64 bg-card text-card-foreground border-r flex flex-col">
        <header className="p-4">
          <Link href="/dashboard">
            <Image
              src="/logo.svg"
              width={504}
              height={407}
              alt={`${APP_NAME} Logo`}
              className="w-12 h-12 object-contain"
            />
          </Link>
        </header>
        <div className="p-4">
          <OrganizationSwitcher />
        </div>
        <SidebarNav
          list={[
            {
              items: [
                {
                  href: "/dashboard",
                  label: "Chatbots",
                  icon: <LayoutGrid size={20} />,
                  end: true,
                },
                {
                  href: "/dashboard/plan-billing",
                  label: "Plan & Billing",
                  icon: <CreditCard size={20} />,
                },
                {
                  href: "/dashboard/settings",
                  label: "Settings",
                  icon: <Settings size={20} />,
                },
              ],
            },
          ]}
        />
        <div className="p-4">
          <SideBarUserButton />
        </div>
      </aside>
      <div className="ml-64">{children}</div>
    </>
  );
}
