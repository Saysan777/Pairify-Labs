"use server";

import { deleteUser } from "@/data-access/users";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function deleteAccountAction() {
  const session = await getSession();

  if (!session)
    throw new Error("Your must be looged in to delete your account");

  await deleteUser(session.user.id);
  redirect("/");
}
