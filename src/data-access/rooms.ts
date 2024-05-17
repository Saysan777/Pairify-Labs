import { db } from "@/db";
import { Room, room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { eq, like } from "drizzle-orm";
import { unstable_noStore } from "next/cache";

export async function getRooms(search: string | undefined) {
  // unstable_noStore(); // now getRooms fn doesn't cache any data and makes the component that calls getRooms fn a dynamic component. (Refactor) Calling this from client.

  const where = search ? like(room.tags, `%${search}%`) : undefined;
  const rooms = await db.query.room.findMany({
    where,
  });

  return rooms;
}

export async function getRoom(roomId: string) {
  return await db.query.room.findFirst({
    where: eq(room.id, roomId),
  });
}

export async function getPersonalRooms(userId: string) {
  return await db.query.room.findMany({
    where: eq(room.userId, userId),
  });
}

export async function deleteRoom(roomId: string) {
  await db.delete(room).where(eq(room.id, roomId));
}

// except id, everything is available
export async function createRoom(
  roomData: Omit<Room, "id" | "userId">,
  userId: string
) {
  await db.insert(room).values({ ...roomData, userId });
}

// everydata is available
export async function editRoom(roomData: Room) {
  await db.update(room).set(roomData).where(eq(room.id, roomData.id));
}
