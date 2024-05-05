"use server";

import { Room, room } from "@/db/schema";
import { db } from "@/db";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// This is same as making `api/createRoomAction`. We are rather using `use server`` directive for better approach and solution.
export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
  const session = await getSession(); // we could've use useSession but it won't have the id which we need.

  if (!session) throw new Error("You must be logged in to create room");

  await db.insert(room).values({ ...roomData, userId: session.user.id });

  revalidatePath("/"); // re-fetching data in home page as new data is inserted.(can also do router.refresh on client)
}
