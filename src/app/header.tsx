"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

function AccountDropDown() {
  const session = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" className="gap-2 ">
          <Avatar>
            <AvatarImage src={session.data?.user?.image ?? ""} />
          </Avatar>

          {session.data?.user.name}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
        >
          <LogOut className="mr-2" /> Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const Header = () => {
  const session = useSession();
  const isLoggedIn = session?.data;

  return (
    <header className=" border-b py-4 container dark:bg-gray-900 mx-auto">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center font-bold">
          {/* <Link
            href="/"
            className="italic font-serif tracking-wider text-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 inline-block text-transparent bg-clip-text cursor-pointer"
          >
            Pairify-Labs
          </Link> */}

          <Link
            href="/"
            className="font-mono tracking-wider text-xl bg-gradient-to-r from-cyan-500 to-blue-500 inline-block text-transparent bg-clip-text cursor-pointer"
          >
            Pairify
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <nav className="flex gap-4">
            {isLoggedIn && (
              <Link href={"/browse"} className="hover:underline font-bold">
                Browse
              </Link>
            )}

            <Separator orientation="vertical" />

            {isLoggedIn && (
              <Link
                href={"/personal-rooms"}
                className="hover:underline font-bold"
              >
                My rooms
              </Link>
            )}
          </nav>
          {isLoggedIn && <AccountDropDown />}
          {!isLoggedIn && (
            <Button
              variant="link"
              className="gap-2"
              onClick={() => signIn("google")}
            >
              <LogIn /> Sign In
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
