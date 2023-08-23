"use client";

import { useAtomValue } from "jotai";
import { nameAtom } from "./store";
import { ArrowLeft, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ChatboxPreviewer() {
  const name = useAtomValue(nameAtom) || "...";
  return (
    <div className="w-[400px] h-[620px] bg-white shadow-2xl rounded-xl">
      <header className="border-b px-2 flex items-center h-14 gap-2">
        <Button size="icon" variant="ghost">
          <ArrowLeft size={20} />
        </Button>
        <h1 className="font-bold text-lg flex-1 truncate">{name}</h1>
        <Button size="icon" variant="ghost">
          <MoreVertical size={20} />
        </Button>
      </header>
    </div>
  );
}
