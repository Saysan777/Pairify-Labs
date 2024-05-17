"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "@/db/schema";
import { splitTags } from "@/lib/utils";
import Link from "next/link";
import { GithubIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TagsList } from "@/components/tags-list";
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
import { deleteRoomAction } from "./action";

// Always create necessary components in same file. Create new if re-used by multiple or is very lengthy.
export function PersonalRoomCard({ room }: { room: Room }) {
  return (
    <Card>
      <CardHeader className="relative">
        <Button className="absolute top-1 right-1" size="icon">
          <Link href={`/edit-room/${room.id}`}>
            <PencilIcon />
          </Link>
        </Button>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <TagsList tags={splitTags(room.tags)} />

        {room.githubRepo && (
          <Link
            href={room.githubRepo}
            className="flex items-center gap-2"
            target="_blank"
            rel="noopner noreferrer"
          >
            <GithubIcon /> Github Project
          </Link>
        )}
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"destructive"}>
              <Trash2Icon className="mr-2 w-4 h-4" /> Delete Room
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                room and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  deleteRoomAction(room.id);
                }}
              >
                Yes
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
