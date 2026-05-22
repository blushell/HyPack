import { clerkClient } from "@clerk/nextjs/server";
import { isUsernameBlacklisted } from "@/lib/auth/blacklisted-usernames";

export async function rejectBlacklistedUser(
  userId: string,
  username: string | null | undefined,
  sessionId: string | null | undefined,
): Promise<boolean> {
  if (!username || !isUsernameBlacklisted(username)) {
    return false;
  }

  if (!process.env.CLERK_SECRET_KEY) {
    console.error(
      "Blacklisted username detected but CLERK_SECRET_KEY is not set:",
      username,
    );
    return true;
  }

  const client = await clerkClient();

  try {
    if (sessionId) {
      await client.sessions.revokeSession(sessionId);
    }

    const { data: sessions } = await client.sessions.getSessionList({ userId });
    await Promise.all(
      sessions.map((session) => client.sessions.revokeSession(session.id)),
    );

    await client.users.deleteUser(userId);
  } catch (error) {
    console.error("Failed to reject blacklisted username user:", userId, error);
  }

  return true;
}

export async function revokeStaleSession(sessionId: string | null | undefined) {
  if (!sessionId || !process.env.CLERK_SECRET_KEY) {
    return;
  }

  try {
    const client = await clerkClient();
    await client.sessions.revokeSession(sessionId);
  } catch {
    // Session may already be invalid.
  }
}
