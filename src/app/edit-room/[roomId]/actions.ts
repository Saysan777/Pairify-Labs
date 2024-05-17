"use server";

import { editRoom, getRoom } from "@/data-access/rooms";
import { Room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editRoomAction(roomData: Omit<Room, "userId">) {
  const session = await getSession();

  if (!session) throw new Error("user not authenticated");

  const room = await getRoom(roomData.id);
  if (room?.userId !== session.user.id) throw new Error("User not authroized");

  await editRoom({ ...roomData, userId: session.user.id });

  revalidatePath("/personal-rooms");
  redirect("/personal-rooms");
}
