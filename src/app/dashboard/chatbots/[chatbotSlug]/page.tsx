import PageHeader from "@/components/page-header";
import { prisma } from "@/lib/prisma";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function Page({
  params: { chatbotSlug: slug },
}: {
  params: { chatbotSlug: string };
}) {
  const data = await prisma.chatbot.findUnique({
    where: { slug },
    select: { _count: { select: { links: true, quickPrompts: true } } },
  });
  if (!data) {
    return null;
  }

  return (
    <main className="container space-y-8 py-8">
      <PageHeader title="Overview" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card text-card-foreground border p-4 rounded-lg shadow-sm">
          <h3 className="text-muted-foreground">Total Links</h3>
          <div className="pt-4">
            <p className="text-3xl font-semibold">{data._count.links}</p>
          </div>
          <div className="pt-4 flex items-center justify-end">
            <Link
              href={`/dashboard/chatbots/${slug}/links`}
              className="text-primary hover:underline underline-offset-4 inline-flex items-center gap-2 text-sm"
            >
              All Links
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
