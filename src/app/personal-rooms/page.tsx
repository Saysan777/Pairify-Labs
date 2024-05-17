import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PersonalRoomCard } from "./personal-room-card";
import { unstable_noStore } from "next/cache";
import { getPersonalRoomsAction } from "./action";

export default async function PersonalRoomsPage() {
  unstable_noStore();
  const rooms = await getPersonalRoomsAction();

  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between w-full mb-8">
        <h1 className="text-4xl">Join Dev Rooms</h1>
        <Button>
          <Link href="/create-room">Create room </Link>
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {rooms.map((room) => {
          return <PersonalRoomCard key={room.id} room={room} />;
        })}
      </div>
    </main>
  );
}
