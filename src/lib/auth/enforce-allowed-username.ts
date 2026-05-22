import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isUsernameBlacklisted } from "@/lib/auth/blacklisted-usernames";
import { revokeStaleSession } from "@/lib/auth/reject-blacklisted-user";

export async function ensureSignupAllowed() {
  const { userId, sessionId } = await auth();

  if (!userId) {
    redirect("/sign-up");
  }

  const user = await currentUser();

  if (!user) {
    await revokeStaleSession(sessionId);
    redirect("/sign-up?error=blacklisted_username");
  }

  if (isUsernameBlacklisted(user.username)) {
    try {
      const client = await clerkClient();
      await client.users.deleteUser(userId);
    } catch (error) {
      console.error("Failed to delete blacklisted user at signup:", error);
    }

    await revokeStaleSession(sessionId);
    redirect("/sign-up?error=blacklisted_username");
  }
}
