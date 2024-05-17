import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getRooms } from "@/data-access/rooms";
import { SearchBar } from "./search-bar";
import { RoomCard } from "@/app/browse/room-card";
import { unstable_noStore } from "next/cache";

export default async function Home({ searchParams }: { searchParams: string }) {
  const query = searchParams.search;

  unstable_noStore();
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
