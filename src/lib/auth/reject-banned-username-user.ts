import { clerkClient } from "@clerk/nextjs/server";
import { isUsernameBanned } from "@/lib/auth/banned-usernames";

type ClerkUserEvent = {
  id: string;
  username: string | null;
};

export async function rejectBannedUsernameUser(
  user: ClerkUserEvent,
  eventType: "user.created" | "user.updated",
) {
  if (!isUsernameBanned(user.username)) {
    return false;
  }

  if (!process.env.CLERK_SECRET_KEY) {
    console.error(
      "Banned username detected but CLERK_SECRET_KEY is not set:",
      user.username,
    );
    return true;
  }

  const client = await clerkClient();

  try {
    if (eventType === "user.created") {
      await client.users.deleteUser(user.id);
    } else {
      await client.users.banUser(user.id);
    }
  } catch (error) {
    console.error("Failed to reject banned username user:", user.id, error);
  }

  return true;
}
