import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "@/db/schema";
import { GithubIcon } from "lucide-react";
import { getRooms } from "@/data-access/rooms";
import { TagsList, splitTags } from "@/components/tags-list";
import { SearchBar } from "./search-bar";

// Always create necessary components in same file. Create new if re-used by multiple or is very lengthy.
function RoomCard({ room }: { room: Room }) {
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

export default async function Home({ searchParams }: { searchParams: string }) {
  const query = searchParams.search;

  const rooms = await getRooms(query);

  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between w-full mb-8">
        <h1 className="text-4xl">Join Dev Rooms</h1>
        <Button>
          <Link href="/create-room">Create room </Link>
        </Button>
      </div>

      <SearchBar />

      <div className="grid grid-cols-3 gap-6">
        {rooms.map((room) => {
          return <RoomCard key={room.id} room={room} />;
        })}
      </div>
    </main>
  );
}
