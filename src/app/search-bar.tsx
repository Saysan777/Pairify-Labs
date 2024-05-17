"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const searchschema = z.object({
  search: z.string().min(0).max(50),
});

export function SearchBar() {
  const query = useSearchParams();
  const router = useRouter();

  const search = useForm<z.infer<typeof searchschema>>({
    resolver: zodResolver(searchschema),
    defaultValues: {
      search: query.get("search") || "",
    },
  });

  async function onSubmit(values: z.infer<typeof searchschema>) {
    if (values.search) {
      router.push(`/?search=${values.search}`);
    } else {
      router.push("/");
    }
  }

  return (
    <Form {...search}>
      <form
        onSubmit={search.handleSubmit(onSubmit)}
        className="flex space-x-4 mb-8"
      >
        <FormField
          control={search.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  className="w-[440px]"
                  placeholder="Filter rooms by keywords, such as typescript, nextjs"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          <SearchIcon className="mr-2" />
          Search
        </Button>

        {query.get("search") && (
          <Button
            variant="link"
            onClick={() => {
              search.setValue("search", "");
              router.push("/");
            }}
          >
            Clear
          </Button>
        )}
      </form>
    </Form>
  );
}
