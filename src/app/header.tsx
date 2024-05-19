"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn, LogOut, Menu, Trash2Icon } from "lucide-react";
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
import { deleteAccountAction } from "./actions";

function AccountDropDown() {
  const session = useSession();
  const [accountOpen, setAccountOpen] = useState(false);

  return (
    <>
      <AlertDialog open={accountOpen} onOpenChange={setAccountOpen}>
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

          <DropdownMenuItem onClick={() => setAccountOpen(true)}>
            <Trash2Icon className="w-4 h-4 mr-2" />
            Delete account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

function MobileDropDown() {
  const session = useSession();
  const isLoggedIn = session?.data;
  const [deleteAccount, setDeleteAccount] = useState(false);

  return (
    <div className="flex justify-between items-center ml-3 md:hidden">
      <Link
        href="/"
        className="font-mono font-bold text-lg bg-gradient-to-r from-cyan-500 to-blue-500 inline-block text-transparent bg-clip-text cursor-pointer"
      >
        Pairify
      </Link>

      <div className="mr-3">
        <div className="flex gap-4">
          <ModeToggle />

          {/* //**  Make this alert dialog resuable component */}
          <AlertDialog open={deleteAccount} onOpenChange={setDeleteAccount}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
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
            <DropdownMenuTrigger>
              <Button className="ring-0 focus:ring-0">
                <Menu className="w-4 h-3" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="border-0">
              {!isLoggedIn && (
                <DropdownMenuItem>
                  <Button
                    variant={"link"}
                    className="flex gap-2 text-sm items-center"
                    onClick={() =>
                      signIn("google", {
                        redirect: true,
                        callbackUrl: "/browse",
                      })
                    }
                  >
                    <LogIn /> Sign In
                  </Button>
                </DropdownMenuItem>
              )}

              {isLoggedIn && (
                <DropdownMenuItem>
                  <Link href={"/browse"} className="hover:underline">
                    Browse
                  </Link>
                </DropdownMenuItem>
              )}

              {isLoggedIn && <DropdownMenuSeparator />}

              {isLoggedIn && (
                <DropdownMenuItem>
                  <Link href={"/personal-rooms"} className="hover:underline">
                    My rooms
                  </Link>
                </DropdownMenuItem>
              )}

              {isLoggedIn && <DropdownMenuSeparator />}

              {isLoggedIn && (
                <DropdownMenuItem>
                  <div className="" onClick={() => setDeleteAccount(true)}>
                    Delete account
                  </div>
                </DropdownMenuItem>
              )}

              {isLoggedIn && <DropdownMenuSeparator />}

              {isLoggedIn && (
                <DropdownMenuItem>
                  <div
                    onClick={() =>
                      signOut({
                        callbackUrl: "/",
                      })
                    }
                  >
                    Sign out
                  </div>
                  <DropdownMenuSeparator />
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

const Header = () => {
  const session = useSession();
  const isLoggedIn = session?.data;
  const [isClient, setIsClient] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <header className="border-b py-4 dark:bg-gray-900 mx-auto">
      {/* //* mobile nav */}
      <div className="">
        <MobileDropDown />
      </div>

      {/* //* desktop nav*/}
      <div className="hidden md:container md:flex md:justify-between md:items-center">
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
              className="flex gap-2"
              onClick={() =>
                signIn("google", {
                  redirect: true,
                  callbackUrl: "/browse",
                })
              }
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
