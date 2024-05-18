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
import { useEffect } from "react";
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

  useEffect(() => {
    search.setValue("search", query.get("search") || "");
  }, [search, query]);

  async function onSubmit(values: z.infer<typeof searchschema>) {
    if (values.search) {
      router.push(`/browse?search=${values.search}`);
    } else {
      router.push("/browse");
    }
  }

  return (
    <Form {...search}>
      <form
        onSubmit={search.handleSubmit(onSubmit)}
        className="flex items-center gap-4 md:flex-row md:items-center md:space-y-0 md:space-x-4 mb-8"
      >
        <FormField
          control={search.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  className="w-[200px] md:w-[440px]"
                  placeholder="Filter rooms by keywords, such as typescript, nextjs"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-[90px] md:w-[100px]">
          <SearchIcon className="mr-2" />
          <p className="text-xs">Search</p>
        </Button>

        {query.get("search") && (
          <Button
            variant="link"
            onClick={() => {
              search.setValue("search", "");
              router.push("/browse");
            }}
          >
            Clear
          </Button>
        )}
      </form>
    </Form>
  );
}
