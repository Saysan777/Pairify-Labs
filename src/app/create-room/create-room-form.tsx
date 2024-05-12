"use client";

// see shadcn and just copy paste it

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createRoomAction } from "./action";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(100),
  githubRepo: z.string().min(1).max(50),
  tags: z.string().min(1).max(50),
});

const CreateRoomForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      githubRepo: "",
      tags: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createRoomAction(values);

    router.push("/");
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Pairify Is Awesome" />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Working in side project. Join the room."
                  />
                </FormControl>
                <FormDescription>
                  Please describe what you&apos;ll be coding on.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="githubRepo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Github Repo</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="https://github.com/username/project"
                  />
                </FormControl>
                <FormDescription>
                  Please put a link to your github repository.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Programming Language</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="typescript, nextjs, tailwind"
                  />
                </FormControl>
                <FormDescription>
                  List the primary programming language you&apos;ll be working
                  with.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateRoomForm;
