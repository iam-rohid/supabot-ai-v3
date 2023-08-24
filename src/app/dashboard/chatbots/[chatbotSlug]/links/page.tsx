import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import { MoreVertical } from "lucide-react";
import { Suspense } from "react";

export default function LinksPage({
  params: { chatbotSlug },
}: {
  params: { chatbotSlug: string };
}) {
  return (
    <main className="container py-8 space-y-8">
      <PageHeader title="Links" />
      <Suspense fallback={<p>Loading...</p>}>
        <LinksList chatbotSlug={chatbotSlug} />
      </Suspense>
    </main>
  );
}

async function LinksList({ chatbotSlug }: { chatbotSlug: string }) {
  const links = await prisma.link.findMany({
    where: { chatbot: { slug: chatbotSlug } },
  });

  if (links.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No links added yet!</CardTitle>
        </CardHeader>
        <CardFooter>
          <Button>Add Link</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox />
            </TableHead>
            <TableHead>URL</TableHead>
            <TableHead>STATUS</TableHead>
            <TableHead>LAST TRAINED AT</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {links.map((link) => (
            <TableRow key={link.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>{link.url}</TableCell>
              <TableCell>{link.status}</TableCell>
              <TableCell>
                {link.lastTrainedAt
                  ? formatDistanceToNow(new Date(link.lastTrainedAt), {
                      addSuffix: true,
                    })
                  : "-"}
              </TableCell>
              <TableCell>
                <Button size="icon" variant="ghost">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
