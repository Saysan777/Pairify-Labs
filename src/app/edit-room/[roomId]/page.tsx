import { getRoom } from "@/data-access/rooms";
import { EditRoomForm } from "./edit-room-form";
import { unstable_noStore } from "next/cache";

export default async function EditRoomPage({
  params,
}: {
  params: { roomId: string };
}) {
  unstable_noStore();
  const room = await getRoom(params.roomId);

  if (!room) return <div className="">Room not found</div>;

  return (
    <div className="md:container md:mx-auto flex flex-col gap-8 pt-12 pb-24">
      <EditRoomForm room={room} />
    </div>
  );
}
