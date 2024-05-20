import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getRooms } from "@/data-access/rooms";
import { SearchBar } from "./search-bar";
import { RoomCard } from "@/app/browse/room-card";
import { unstable_noStore } from "next/cache";
import Image from "next/image";

export default async function Home({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const query = searchParams.search;

  unstable_noStore();
  const rooms = await getRooms(query);

  return (
    <main className="min-h-screen p-1 md:p-6">
      <div className="flex justify-between items-center mt-3 w-full mb-8">
        <h1 className="text-xl md:text-4xl font-bold">Join Dev Rooms</h1>
        <Button className="w-[90px] md:w-[100px]">
          <Link href="/create-room" className="text-xs">
            Create room{" "}
          </Link>
        </Button>
      </div>

      <SearchBar />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 min-w-[300px]">
        {rooms.map((room) => {
          return <RoomCard key={room.id} room={room} />;
        })}
      </div>

      {rooms.length === 0 && (
        <div className="flex flex-col sm:flex gap-4 justify-center items-center mt-32">
          <Image
            src="/empty-rooms.svg"
            alt="empty rooms"
            width={200}
            height={200}
          />
          <h2 className="text-2xl">No rooms found</h2>
        </div>
      )}
    </main>
  );
}
