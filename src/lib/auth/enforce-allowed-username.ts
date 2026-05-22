import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isUsernameBlacklisted } from "@/lib/auth/blacklisted-usernames";

const blacklistedUsernameRedirect = "/sign-up?error=blacklisted_username";

export async function enforceAllowedUsername() {
  const { userId } = await auth();
  if (!userId) {
    return;
  }

  const user = await currentUser();
  if (!user?.username || !isUsernameBlacklisted(user.username)) {
    return;
  }

  try {
    const client = await clerkClient();
    await client.users.deleteUser(userId);
  } catch (error) {
    console.error("Failed to delete user with blacklisted username:", error);
  }

  redirect(blacklistedUsernameRedirect);
}
