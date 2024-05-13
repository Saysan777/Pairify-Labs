"use server";

import { getSession } from "@/lib/auth";
import { StreamChat } from "stream-chat";

export async function generateTokenAction() {
  const session = await getSession();

  if (!session) throw new Error("No session found");

  const { NEXT_PUBLIC_STREAM_API_KEY, NEXT_SECRET_STREAM_API_KEY } =
    process.env;

  const api_key = NEXT_PUBLIC_STREAM_API_KEY!;
  const api_secret = NEXT_SECRET_STREAM_API_KEY!;

  // Initialize a Server Client
  const serverClient = StreamChat.getInstance(api_key, api_secret);
  // Create User Token
  const token = serverClient.createToken(session.user.id);
  return token;
}
