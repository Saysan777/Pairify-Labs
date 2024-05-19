"use client";
import { Button } from "@/components/ui/button";
import {
  CodeIcon,
  ContactIcon,
  FolderSyncIcon,
  ScreenShareIcon,
  SpaceIcon,
  VideoIcon,
} from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © 2024 Pairify. All rights reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Terms of Service
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Privacy Policy
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Twitter
        </Link>
        <Link
          className="text-xs hover:underline underline-offset-4"
          href="https://github.com/Saysan777/Pairify-Labs"
          target="_blank"
        >
          GitHub
        </Link>
      </nav>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div key="1" className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 border-y">
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div className="flex flex-col gap-3">
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Pairify - Elevate Your Coding Collaboration
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Pairify is a powerful pair programming tool that enables
                  seamless collaboration, real-time code sharing, and video
                  conferencing for developers.
                </p>
                <div className="space-x-4">
                  <Link
                    className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    href="/browse"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <Image
                  alt="Hero"
                  className="mx-auto aspect-[3/1] overflow-hidden rounded-t-xl object-fit hidden sm:flex"
                  height="300"
                  src="/pairprogramming.svg"
                  width="1270"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-20">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Collaborate with Ease
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Pairify offers a suite of powerful features to streamline your
                  pair programming experience.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1">
                <div className="flex items-center gap-3">
                  <VideoIcon className="h-8 w-8 text-gray-900 dark:text-gray-50" />
                  <h3 className="text-lg font-bold">Video Calls</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Engage in face-to-face collaboration with your pair
                  programming partner through high-quality video calls.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-3">
                  <ScreenShareIcon className="h-8 w-8 text-gray-900 dark:text-gray-50" />
                  <h3 className="text-lg font-bold">Screen Sharing</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Share your screen in real-time, allowing your partner to see
                  exactly what you&apos;re working on.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-3">
                  <SpaceIcon className="h-8 w-8 text-gray-900 dark:text-gray-50" />
                  <h3 className="text-lg font-bold">Room Creation</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Create and join dedicated rooms for your pair programming
                  sessions, keeping your work organized.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-3">
                  <CodeIcon className="h-8 w-8 text-gray-900 dark:text-gray-50" />
                  <h3 className="text-lg font-bold">Live Coding</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Collaborate on code in real-time, with both partners able to
                  contribute and see changes instantly.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-3">
                  <FolderSyncIcon className="h-8 w-8 text-gray-900 dark:text-gray-50" />
                  <h3 className="text-lg font-bold">Synchronized Editing</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Keep your code in sync, with both partners' cursors and edits
                  visible in real-time.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-3">
                  <ContactIcon className="h-8 w-8 text-gray-900 dark:text-gray-50" />
                  <h3 className="text-lg font-bold">In-App Chat</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Communicate seamlessly with your pair programming partner
                  through the built-in chat functionality.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-200 dark:bg-gray-800">
          <div className="container grid items-center justify-center gap-4 px-4 md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Streamline Your Pair Programming Workflow
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Pairify is designed to help you and your team collaborate
                seamlessly, so you can focus on writing great code together.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                onClick={() => signIn("google")}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
