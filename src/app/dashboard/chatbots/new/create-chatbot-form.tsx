"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button, ButtonLoader } from "@/components/ui/button";
import Link from "next/link";
import { useSetAtom } from "jotai";
import { nameAtom } from "./store";
import { useEffect } from "react";
import { createChatbotValidator } from "@/lib/validators";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Chatbot } from "@prisma/client";

export default function CreateChatbotForm() {
  const setName = useSetAtom(nameAtom);
  const form = useForm<z.infer<typeof createChatbotValidator>>({
    resolver: zodResolver(createChatbotValidator),
    defaultValues: {
      name: "",
      slug: "",
    },
  });
  const { toast } = useToast();
  const router = useRouter();
  const onSubmit = async (body: z.infer<typeof createChatbotValidator>) => {
    try {
      const { data } = await axios.post<Chatbot>(`/api/chatbots`, body);
      toast({ title: "Chatbot created" });
      router.push(`/dashboard/chatbots/${data.slug}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: "Failed",
          description:
            typeof error.response?.data === "string"
              ? error.response?.data
              : "Something went wrong!",
        });
      } else {
        toast({
          title: "Failed",
          description: "Something went wrong!",
        });
      }
    }
  };

  const name = form.watch("name");

  useEffect(() => {
    setName(name);
  }, [name, setName]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="My bot" autoFocus {...field} />
              </FormControl>
              <FormDescription>Max 32 characters.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="my-bot" {...field} />
              </FormControl>
              <FormDescription>Max 32 characters.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button asChild variant="secondary">
            <Link href="/dashboard">Cancel</Link>
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? <ButtonLoader /> : null}
            Create Chatbot
          </Button>
        </div>
      </form>
    </Form>
  );
}
