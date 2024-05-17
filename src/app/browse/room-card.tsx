import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "@/db/schema";
import { TagsList } from "../../components/tags-list";
import { splitTags } from "@/lib/utils";
import Link from "next/link";
import { GithubIcon } from "lucide-react";
import { Button } from "../../components/ui/button";

// Always create necessary components in same file. Create new if re-used by multiple or is very lengthy.
export function RoomCard({ room }: { room: Room }) {
  return (
    <Card>
      <CardHeader>
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
      <CardFooter>
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
