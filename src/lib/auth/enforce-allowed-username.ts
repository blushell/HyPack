import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { rejectBlacklistedUser } from "@/lib/auth/reject-blacklisted-user";

export const blacklistedUsernameRejectedPath = "/sign-up/rejected";

export async function enforceAllowedUsername() {
  const { userId, sessionId } = await auth();
  if (!userId) {
    return;
  }

  const user = await currentUser();
  const wasRejected = await rejectBlacklistedUser(
    userId,
    user?.username,
    sessionId,
  );

  if (wasRejected) {
    redirect(blacklistedUsernameRejectedPath);
  }
}
