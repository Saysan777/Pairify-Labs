"use server";

import { Room, room } from "@/db/schema";
import { db } from "@/db";
import { getSession } from "@/lib/auth";

export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
  const session = await getSession();

  if (!session) throw new Error("You must be logged in to create room");

  await db.insert(room).values({ ...roomData, userId: session.user.id });
}
