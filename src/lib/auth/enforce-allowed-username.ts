import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isUsernameBanned } from "@/lib/auth/banned-usernames";

const bannedUsernameRedirect = "/sign-up?error=banned_username";

export async function enforceAllowedUsername() {
  const { userId } = await auth();
  if (!userId) {
    return;
  }

  const user = await currentUser();
  if (!user?.username || !isUsernameBanned(user.username)) {
    return;
  }

  try {
    const client = await clerkClient();
    await client.users.deleteUser(userId);
  } catch (error) {
    console.error("Failed to delete user with banned username:", error);
  }

  redirect(bannedUsernameRedirect);
}
