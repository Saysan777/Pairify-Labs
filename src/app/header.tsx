"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn, LogOut, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteAccountAction } from "./personal-rooms/actions";

function AccountDropDown() {
  const session = useSession();
  const [open, setOpen] = useState(false);

  return (
    <>
      <AlertDialog open={open} onOpenChange={() => setOpen(false)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteAccountAction();
                signOut({ callbackUrl: "/" });
              }}
            >
              Yes, delete my account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash2Icon className="w-4 h-4 mr-2" />
            Delete account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

const Header = () => {
  const session = useSession();
  const isLoggedIn = session?.data;

  return (
    <header className="border-b py-4 dark:bg-gray-900 mx-auto">
      <div className="container flex justify-between items-center">
        <div className="flex gap-2 items-center font-bold">
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
