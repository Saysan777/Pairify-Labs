import { db } from "@/db";
import { unstable_noStore } from "next/cache";

export async function getRooms() {
  unstable_noStore(); // now getRooms fn doesn't cache any data and makes the component that calls getRooms fn a dynamic component.
  const rooms = await db.query.room.findMany();

  return rooms;
}
