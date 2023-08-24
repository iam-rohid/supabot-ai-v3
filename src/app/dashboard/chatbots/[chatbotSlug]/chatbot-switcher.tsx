"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ChatbotSwitcher({
  currentChatbot,
  chatbots,
  className,
}: {
  currentChatbot: {
    id: string;
    slug: string;
    name: string;
    image?: string | null;
  };
  chatbots: { id: string; slug: string; name: string; image?: string | null }[];
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn("justify-start text-left", className)}
        >
          <Avatar className="w-6 h-6 mr-2 -ml-1">
            {currentChatbot?.image && (
              <AvatarImage src={currentChatbot.image} />
            )}
            <AvatarFallback>
              <Image
                src={`/api/avatar?seed=${currentChatbot.id}&initials=${currentChatbot.slug}&size=128`}
                width={128}
                height={128}
                alt=""
                className="w-full h-full object-cover"
              />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 truncate">{currentChatbot.name}</div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-56 p-0">
        <Command>
          <CommandInput placeholder="Search chatbot..." />
          <CommandEmpty>No chatbot found.</CommandEmpty>
          <CommandGroup>
            {chatbots.map((chatbot) => (
              <CommandItem
                key={chatbot.slug}
                onSelect={() => {
                  router.push(`/dashboard/chatbots/${chatbot.slug}`);
                  setOpen(false);
                }}
              >
                <Avatar className="w-6 h-6 mr-2 -ml-1">
                  {chatbot?.image && <AvatarImage src={chatbot?.image} />}
                  <AvatarFallback>
                    <Image
                      src={`/api/avatar?seed=${chatbot.id}&initials=${chatbot.slug}&size=128`}
                      width={128}
                      height={128}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 truncate">
                  <p className="sr-only">{chatbot.slug}</p>
                  {chatbot.name}
                </div>
                <Check
                  className={cn(
                    "ml-2 h-4 w-4",
                    currentChatbot.slug === chatbot.slug
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup>
            <CommandItem
              onSelect={() => {
                console.log("hello");
                router.push("/dashboard/chatbots/new");
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Chatbot
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
